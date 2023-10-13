import { Progress } from '@libs/uikit/components/progress';

import styles from './view-placeholder.module.scss';

export const ViewPlaceholder = () => {
  return (
    <div className={styles.container}>
      <Progress view="circle" size={64} />
    </div>
  );
};
