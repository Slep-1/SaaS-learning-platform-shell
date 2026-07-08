import { redirect } from 'next/navigation';
import { CapabilityFramework } from '@/features/showcase/CapabilityFramework';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { ORG_PERMISSION } from '@/types/Auth';

export default async function ShowcaseFrameworkPage() {
  const ctx = await getEffectiveAuth();

  if (!ctx) {
    redirect('/sign-in');
  }

  if (ctx.isPreviewing || !roleHasPermission(ctx.role, ORG_PERMISSION.VIEW_PROGRESS)) {
    redirect('/dashboard');
  }

  return <CapabilityFramework />;
}
