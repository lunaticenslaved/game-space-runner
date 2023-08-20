import { ViewPlaceholder } from '@client/shared/components/view-placeholder';

import styles from './loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.page}>
      <ViewPlaceholder />
    </div>
  );
};
