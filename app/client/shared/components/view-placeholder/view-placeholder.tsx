import { Spinner } from '@client/shared/components/spinner';

import styles from './view-placeholder.module.scss';

export const ViewPlaceholder = () => {
  return (
    <div className={styles.container}>
      <Spinner size={64} />
    </div>
  );
};
