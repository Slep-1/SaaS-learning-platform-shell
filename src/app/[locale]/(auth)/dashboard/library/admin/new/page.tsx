import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { createLessonAction } from '@/features/library/actions';
import { LessonForm } from '@/features/library/LessonForm';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { ORG_PERMISSION } from '@/types/Auth';

export default async function NewLessonPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'LessonFormPage',
  });

  const ctx = await getEffectiveAuth();

  if (!ctx || !roleHasPermission(ctx.role, ORG_PERMISSION.MANAGE_CONTENT)) {
    redirect('/dashboard/library');
  }

  return (
    <>
      <TitleBar
        title={t('new_title_bar')}
        description={t('new_title_bar_description')}
      />

      <LessonForm
        action={createLessonAction}
        labels={{
          title: t('field_title'),
          description: t('field_description'),
          htmlFile: t('field_html_file'),
          htmlFileHint: t('field_html_file_hint'),
          progressHooksSummary: t('field_progress_hooks_summary'),
          submit: t('submit_new'),
        }}
      />
    </>
  );
};
