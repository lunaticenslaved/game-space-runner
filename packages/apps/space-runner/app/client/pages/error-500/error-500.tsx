import { ErrorLayout } from '@client/widgets/page-layouts';

export const Error500Page = () => {
  return <ErrorLayout error="500" title="Server error" onHomeClick={() => null} />;
};
