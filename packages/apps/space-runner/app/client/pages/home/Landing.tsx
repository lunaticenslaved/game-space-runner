import { Button } from '@client/shared/components/button';
import { useViewer } from '@client/features/viewer/get-viewer';
import { useAuthNavigation } from '@client/navigation';

import './landing.scss';

export const LandingPage = () => {
  const { isAuthenticated } = useViewer();
  const authNavigate = useAuthNavigation();

  return (
    <div className="landing">
      <div className="landing__content">
        <h1 className="landing__content__title">Добро пожаловать в theTeam</h1>
        {!isAuthenticated && <Button onClick={authNavigate.toSignIn}>Войти</Button>}
      </div>
    </div>
  );
};
