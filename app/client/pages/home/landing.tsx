import { ToSignInButton } from '@client/features/auth/sign-in';
import { useViewer } from '@client/features/auth/get-viewer';

import styles from './landing.module.scss';

const LandingPage = () => {
  const { isAuthenticated } = useViewer();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Добро пожаловать в игру!</h1>
        <div className={styles.body}>{!isAuthenticated && <ToSignInButton />}</div>
      </div>
    </div>
  );
};

export default LandingPage;
