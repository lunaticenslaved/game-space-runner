import { Button } from '@client/shared/components/button';
import { useViewer } from '@client/features/auth/get-viewer';
import { useAuthNavigation } from '@client/navigation';

import styles from './landing.module.scss';

const LandingPage = () => {
  const { isAuthenticated } = useViewer();
  const authNavigate = useAuthNavigation();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Добро пожаловать в игру!</h1>
        <div className={styles.body}>
          {!isAuthenticated && <Button onClick={authNavigate.toSignIn}>Войти</Button>}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
