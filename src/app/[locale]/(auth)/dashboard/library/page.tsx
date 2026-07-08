import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { LessonCard } from '@/features/library/LessonCard';
import { getLessonsForRole } from '@/features/library/queries';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { Link } from '@/libs/I18nNavigation';
import { ORG_PERMISSION } from '@/types/Auth';

export default async function LibraryPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'LibraryPage',
  });

  const ctx = await getEffectiveAuth();

  if (!ctx) {
    redirect('/sign-in');
  }

  const lessons = await getLessonsForRole(ctx.orgId, ctx.role, ctx.userId);
  const canManageContent = roleHasPermission(ctx.role, ORG_PERMISSION.MANAGE_CONTENT);

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      {canManageContent && (
        <div className="mb-6">
          <Link href="/dashboard/library/admin" className={buttonVariants({ variant: 'outline' })}>
            {t('manage_library')}
          </Link>
        </div>
      )}

      <div className="
        grid grid-cols-1 gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </>
  );
};
