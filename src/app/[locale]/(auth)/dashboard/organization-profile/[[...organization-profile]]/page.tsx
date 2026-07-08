import { OrganizationProfile } from '@clerk/nextjs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { InviteMemberForm } from '@/features/dashboard/InviteMemberForm';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { getEffectiveAuth } from '@/libs/Auth';
import { ORG_ROLE } from '@/types/Auth';
import { getI18nPath } from '@/utils/Helpers';

export default async function OrganizationProfilePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'OrganizationProfilePage',
  });

  const ctx = await getEffectiveAuth();

  if (!ctx || ctx.role !== ORG_ROLE.ADMIN) {
    redirect('/dashboard');
  }

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="mb-6 rounded-xl border border-border bg-background p-5">
        <div className="mb-3 text-lg font-bold">{t('invite_heading')}</div>
        <InviteMemberForm
          labels={{
            email: t('invite_email_label'),
            role: t('invite_role_label'),
            roleAdmin: t('invite_role_admin'),
            roleCoordinator: t('invite_role_coordinator'),
            roleLearner: t('invite_role_learner'),
            submit: t('invite_submit'),
          }}
        />
      </div>

      <OrganizationProfile
        routing="path"
        path={getI18nPath('/dashboard/organization-profile', locale)}
        afterLeaveOrganizationUrl="/onboarding/organization-selection"
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full flex', // `flex` is needed when the component has a large width
          },
        }}
      />
    </>
  );
};
