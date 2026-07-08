import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { LessonPlayer } from '@/features/library/LessonPlayer';
import { getLessonById } from '@/features/library/queries';
import { getEffectiveAuth } from '@/libs/Auth';
import { Link } from '@/libs/I18nNavigation';
import { ORG_ROLE } from '@/types/Auth';

export default async function LessonViewerPage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  const lessonId = Number(id);

  if (!Number.isInteger(lessonId)) {
    notFound();
  }

  const ctx = await getEffectiveAuth();

  if (!ctx) {
    redirect('/sign-in');
  }

  const lesson = await getLessonById(ctx.orgId, lessonId, ctx.role, ctx.userId);

  if (!lesson) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'LessonViewerPage',
  });

  // Top offset accounts for the 72px header, plus the 44px ViewAsBanner (h-11) when preview mode is active.
  return (
    <div className={ctx.isPreviewing
      ? 'fixed inset-x-0 top-[116px] bottom-0 z-40 flex flex-col bg-background'
      : 'fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col bg-background'}
    >
      <div className="
        flex items-center gap-x-3 border-b border-border bg-card px-4 py-3
      "
      >
        <Link href="/dashboard/library" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          <ArrowLeftIcon className="size-4" />
          {t('back_to_library')}
        </Link>

        <div className="truncate text-sm font-semibold">{lesson.title}</div>
      </div>

      <LessonPlayer
        lessonId={lesson.id}
        title={lesson.title}
        htmlContent={lesson.htmlContent}
        trackProgress={ctx.role === ORG_ROLE.LEARNER && !ctx.isPreviewing}
      />
    </div>
  );
};
