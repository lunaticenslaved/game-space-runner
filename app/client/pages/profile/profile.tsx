import { useViewer } from '@client/features/auth/get-viewer';

import { Account } from './views/account';
import { Loading } from './views/loading';

const ProfilePage = () => {
  document.title = 'Профиль';

  const { viewer } = useViewer();

  if (!viewer) {
    return <Loading />;
  }

  return <Account user={viewer} />;
};

export default ProfilePage;
