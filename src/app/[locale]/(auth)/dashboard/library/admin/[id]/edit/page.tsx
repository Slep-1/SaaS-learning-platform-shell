import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { updateLessonAction } from '@/features/library/actions';
import { LessonForm } from '@/features/library/LessonForm';
import { getLessonById } from '@/features/library/queries';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { ORG_PERMISSION } from '@/types/Auth';

export default async function EditLessonPage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'LessonFormPage',
  });

  const lessonId = Number(id);

  if (!Number.isInteger(lessonId)) {
    notFound();
  }

  const ctx = await getEffectiveAuth();

  if (!ctx || !roleHasPermission(ctx.role, ORG_PERMISSION.MANAGE_CONTENT)) {
    redirect('/dashboard/library');
  }

  const lesson = await getLessonById(ctx.orgId, lessonId, ctx.role, ctx.userId);

  if (!lesson) {
    notFound();
  }

  return (
    <>
      <TitleBar
        title={t('edit_title_bar')}
        description={t('edit_title_bar_description')}
      />

      <LessonForm
        action={updateLessonAction.bind(null, lessonId)}
        defaultValues={{ title: lesson.title, description: lesson.description }}
        labels={{
          title: t('field_title'),
          description: t('field_description'),
          htmlFile: t('field_html_file'),
          htmlFileHint: t('field_html_file_hint_edit'),
          progressHooksSummary: t('field_progress_hooks_summary'),
          submit: t('submit_edit'),
        }}
      />
    </>
  );
};
