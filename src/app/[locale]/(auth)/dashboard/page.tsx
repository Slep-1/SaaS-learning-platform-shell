import { ArrowRightIcon } from '@radix-ui/react-icons';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { PageMessage } from '@/features/dashboard/PageMessage';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { TodayPriorities } from '@/features/dashboard/TodayPriorities';
import { getLearnerPriorityAssignments } from '@/features/library/queries';
import { getEffectiveAuth } from '@/libs/Auth';
import { Link } from '@/libs/I18nNavigation';
import { ORG_ROLE } from '@/types/Auth';

export default async function DashboardIndexPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'DashboardIndexPage',
  });

  const ctx = await getEffectiveAuth();

  if (!ctx) {
    redirect('/sign-in');
  }

  if (ctx.role === ORG_ROLE.LEARNER) {
    const assignments = await getLearnerPriorityAssignments(ctx.orgId, ctx.userId);

    return (
      <>
        <TitleBar
          title={t('today_title_bar')}
          description={t('today_title_bar_description')}
        />

        <TodayPriorities
          assignments={assignments}
          labels={{
            learnTitle: t('learn_title'),
            learnDescription: t('learn_description'),
            continueButton: t('continue_button'),
            emptyLearnTitle: t('empty_learn_title'),
            emptyLearnDescription: t('empty_learn_description'),
            verifyTitle: t('verify_title'),
            verifyDescription: t('verify_description'),
            askTitle: t('ask_title'),
            askDescription: t('ask_description'),
            updatesTitle: t('updates_title'),
            updatesDescription: t('updates_description'),
            comingSoon: t('coming_soon'),
            statusGreen: t('status_green'),
            statusYellow: t('status_yellow'),
            statusRed: t('status_red'),
            progressNotStarted: t('progress_not_started'),
            progressInProgress: t('progress_in_progress'),
            progressFinished: t('progress_finished'),
            dueDate: t('due_date'),
            noDueDate: t('no_due_date'),
            remainingCountOne: t('remaining_count_one'),
            remainingCountOther: t('remaining_count_other'),
          }}
        />
      </>
    );
  }

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <PageMessage
        icon={(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
            <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
            <path d="M3 6l0 13" />
            <path d="M12 6l0 13" />
            <path d="M21 6l0 13" />
          </svg>
        )}
        title={t('message_state_title')}
        description={t('message_state_description')}
        button={(
          <Link href="/dashboard/library" className={buttonVariants({ size: 'lg' })}>
            {t('library_button')}
            <ArrowRightIcon className="ml-1 size-5" />
          </Link>
        )}
      />
    </>
  );
};
