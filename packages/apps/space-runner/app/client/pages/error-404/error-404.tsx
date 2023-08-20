import { ErrorLayout } from '@client/widgets/page-layouts';

export const Error404Page = () => {
  return <ErrorLayout error="404" title="Не туда попали" onHomeClick={() => null} />;
};
