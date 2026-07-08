import { redirect } from 'next/navigation';
import { CleanroomShowcase } from '@/features/showcase/CleanroomShowcase';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { ORG_PERMISSION } from '@/types/Auth';

export default async function ShowcasePage() {
  const ctx = await getEffectiveAuth();

  if (!ctx) {
    redirect('/sign-in');
  }

  if (ctx.isPreviewing || !roleHasPermission(ctx.role, ORG_PERMISSION.VIEW_PROGRESS)) {
    redirect('/dashboard');
  }

  return <CleanroomShowcase />;
}
