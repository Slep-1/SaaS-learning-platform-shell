import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { LessonAdminRow } from '@/features/library/LessonAdminRow';
import { getLessonsForRole } from '@/features/library/queries';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { Link } from '@/libs/I18nNavigation';
import { ORG_PERMISSION } from '@/types/Auth';

export default async function LibraryAdminPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'LibraryAdminPage',
  });

  const ctx = await getEffectiveAuth();

  if (!ctx || !roleHasPermission(ctx.role, ORG_PERMISSION.MANAGE_CONTENT)) {
    redirect('/dashboard/library');
  }

  const lessons = await getLessonsForRole(ctx.orgId, ctx.role, ctx.userId);

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="mb-6 flex gap-3">
        <Link href="/dashboard/library/admin/new" className={buttonVariants({ size: 'lg' })}>
          {t('add_lesson')}
        </Link>

        <Link href="/dashboard/library/assignments" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
          {t('manage_assignments')}
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {lessons.map(lesson => (
          <LessonAdminRow
            key={lesson.id}
            lesson={lesson}
            editLabel={t('edit')}
            deleteLabel={t('delete')}
            deleteConfirm={t('delete_confirm')}
          />
        ))}
      </div>
    </>
  );
};
