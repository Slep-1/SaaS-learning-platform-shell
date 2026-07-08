import type { NextFetchEvent, NextRequest } from 'next/server';
import type { OrgRole } from './types/Auth';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { resolveEffectiveRole, roleHasPermission, VIEW_AS_COOKIE_NAME } from './libs/Auth';
import { routing } from './libs/I18nRouting';
import { ORG_PERMISSION, ORG_ROLE } from './types/Auth';

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',
  '/onboarding(.*)',
  '/:locale/onboarding(.*)',
]);

const isAuthPage = createRouteMatcher([
  '/sign-in(.*)',
  '/:locale/sign-in(.*)',
  '/sign-up(.*)',
  '/:locale/sign-up(.*)',
]);

// Coarse, early gate — the authoritative check is the same `resolveEffectiveRole` +
// `roleHasPermission` logic re-run at the page/Server Action level (see src/libs/Auth.ts),
// which is what actually protects data access. This just avoids a flash of admin UI / an
// unnecessary render for a role that can't be here.
const isAdminContentRoute = createRouteMatcher([
  '/dashboard/library/admin(.*)',
  '/:locale/dashboard/library/admin(.*)',
]);

const isOrgManagementRoute = createRouteMatcher([
  '/dashboard/organization-profile(.*)',
  '/:locale/dashboard/organization-profile(.*)',
]);

// A sibling of /dashboard/library/admin, not nested under it — nesting would make
// isAdminContentRoute's `(.*)` also match this path and lock Coordinators out, defeating the
// point of having a separate, less-restrictive route for assignment management.
const isAssignmentsRoute = createRouteMatcher([
  '/dashboard/library/assignments(.*)',
  '/:locale/dashboard/library/assignments(.*)',
]);

export default async function proxy(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Clerk keyless mode doesn't work with i18n, this is why we need to run the middleware conditionally
  if (
    isAuthPage(request) || isProtectedRoute(request)
  ) {
    return clerkMiddleware(async (auth, req) => {
      // Check if the current route is protected and requires authentication
      // If user is not authenticated, redirect them to the sign-in page with proper locale
      if (isProtectedRoute(req)) {
        const locale = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        await auth.protect({
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      const authObj = await auth();

      // Redirect authenticated users without an organization to the organization selection page
      // This ensures users are properly associated with an organization before accessing the dashboard
      if (
        authObj.userId
        && !authObj.orgId
        && req.nextUrl.pathname.includes('/dashboard')
        && !req.nextUrl.pathname.endsWith('/organization-selection')
      ) {
        const orgSelection = new URL(
          '/onboarding/organization-selection',
          req.url,
        );

        return NextResponse.redirect(orgSelection);
      }

      if (authObj.orgId && authObj.orgRole && (isAdminContentRoute(req) || isOrgManagementRoute(req) || isAssignmentsRoute(req))) {
        const viewAsCookie = req.cookies.get(VIEW_AS_COOKIE_NAME)?.value;
        const effectiveRole = resolveEffectiveRole(authObj.orgRole as OrgRole, viewAsCookie, authObj.orgId);

        if (isAdminContentRoute(req) && !roleHasPermission(effectiveRole, ORG_PERMISSION.MANAGE_CONTENT)) {
          return NextResponse.redirect(new URL('/dashboard/library', req.url));
        }

        if (isOrgManagementRoute(req) && effectiveRole !== ORG_ROLE.ADMIN) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (isAssignmentsRoute(req) && !roleHasPermission(effectiveRole, ORG_PERMISSION.ASSIGN_LESSONS)) {
          return NextResponse.redirect(new URL('/dashboard/library', req.url));
        }
      }

      return handleI18nRouting(req);
    })(request, event);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
};
