import { useOAuthRedirect } from '@client/features/auth';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';

export const OAuthPage = () => {
  useOAuthRedirect();

  return <ViewPlaceholder />;
};
