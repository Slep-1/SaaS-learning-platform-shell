'use client';

import { OrganizationSwitcher, Show, useOrganization } from '@clerk/nextjs';
import { useLocale } from 'next-intl';
import { getI18nPath } from '@/utils/Helpers';

export const OrganizationMenu = (props: { isLearnerView: boolean }) => {
  const locale = useLocale();
  const { organization } = useOrganization();

  // Learners have no reason to switch or manage organizations, so showing them a switcher
  // control implies capabilities they don't have — just name the company/business instead.
  if (props.isLearnerView) {
    return (
      <div className="
        max-w-28 truncate font-medium
        sm:max-w-52
      "
      >
        {organization?.name}
      </div>
    );
  }

  // Only render OrganizationSwitcher for signed-in users to avoid Clerk's active session warning.
  // To avoid warning, 'use client' is also required.
  return (
    <Show when="signed-in">
      <OrganizationSwitcher
        organizationProfileMode="navigation"
        organizationProfileUrl={getI18nPath(
          '/dashboard/organization-profile',
          locale,
        )}
        afterCreateOrganizationUrl="/dashboard"
        hidePersonal
        skipInvitationScreen
        appearance={{
          elements: {
            organizationSwitcherTrigger: 'max-w-28 sm:max-w-52',
          },
        }}
      />
    </Show>
  );
};
