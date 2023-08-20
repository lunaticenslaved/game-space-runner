import { Button } from '@client/shared/components/button';
import { useViewer } from '@client/features/viewer/get-viewer';
import { useAuthNavigation } from '@client/navigation';
import { DefaultLayout } from '@client/widgets/page-layouts';

import './landing.scss';

const LandingPage = () => {
  const { isAuthenticated } = useViewer();
  const authNavigate = useAuthNavigation();

  return (
    <DefaultLayout>
      <div className="landing">
        <div className="landing__content">
          <h1 className="landing__content__title">Добро пожаловать в theTeam</h1>
          {!isAuthenticated && <Button onClick={authNavigate.toSignIn}>Войти</Button>}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
