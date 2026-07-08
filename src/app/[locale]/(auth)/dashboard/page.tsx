import { ArrowRightIcon } from '@radix-ui/react-icons';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { PageMessage } from '@/features/dashboard/PageMessage';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { Link } from '@/libs/I18nNavigation';

export default async function DashboardIndexPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'DashboardIndexPage',
  });

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
