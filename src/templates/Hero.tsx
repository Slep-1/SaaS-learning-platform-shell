import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';
import { Link } from '@/libs/I18nNavigation';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <Section className="py-36">
      <CenteredHero
        title={t.rich('title', {
          important: chunks => (
            <span className="text-[#2563eb]">
              {chunks}
            </span>
          ),
        })}
        description={t('description')}
        buttons={(
          <Link
            className={buttonVariants({ size: 'lg' })}
            href="/sign-up"
          >
            {t('primary_button')}
            <ArrowRightIcon className="ml-1 size-5" />
          </Link>
        )}
      />
    </Section>
  );
};
