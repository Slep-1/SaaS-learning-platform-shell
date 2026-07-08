import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { ViewAsBanner } from '@/features/dashboard/ViewAsBanner';
import { ViewAsPicker } from '@/features/dashboard/ViewAsPicker';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { ORG_PERMISSION, ORG_ROLE } from '@/types/Auth';

type DashboardLayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata(props: DashboardLayoutProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'DashboardLayout',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'DashboardLayout',
  });

  const ctx = await getEffectiveAuth();

  const menu = [
    { href: '/dashboard', label: t('home') },
    { href: '/dashboard/library', label: t('library') },
    ...(ctx != null && roleHasPermission(ctx.role, ORG_PERMISSION.ASSIGN_LESSONS)
      ? [{ href: '/dashboard/library/assignments', label: t('assignments') }]
      : []),
    ...(ctx?.role === ORG_ROLE.ADMIN
      ? [
          { href: '/dashboard/organization-profile/organization-members', label: t('members') },
          { href: '/dashboard/organization-profile', label: t('settings') },
        ]
      : []),
  ];

  const canViewAsLearner = ctx != null && !ctx.isPreviewing && roleHasPermission(ctx.role, ORG_PERMISSION.VIEW_AS_LEARNER);

  return (
    <>
      {ctx?.isPreviewing && ctx.previewLearner && (
        <ViewAsBanner
          label={t('viewing_as', { name: ctx.previewLearner.name })}
          exitLabel={t('exit_preview')}
        />
      )}

      <div className="shadow-md">
        <div className="
          mx-auto flex max-w-7xl items-center justify-between px-3 py-4
        "
        >
          <DashboardHeader
            menu={menu}
            isLearnerView={ctx?.role === ORG_ROLE.LEARNER}
            viewAsPicker={canViewAsLearner && ctx
              ? (
                  <ViewAsPicker
                    orgId={ctx.orgId}
                    label={t('view_as_label')}
                    buttonLabel={t('view_as_button')}
                  />
                )
              : undefined}
          />
        </div>
      </div>

      {/* Content min-height accounts for the 72px header, plus the 44px ViewAsBanner (h-11)
          when preview mode is active. */}
      <div className={ctx?.isPreviewing
        ? 'min-h-[calc(100vh-116px)] bg-muted'
        : `min-h-[calc(100vh-72px)] bg-muted`}
      >
        <div className="mx-auto max-w-7xl px-3 pt-6 pb-16">
          {props.children}
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
