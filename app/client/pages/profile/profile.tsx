import { useMemo } from 'react';

import { useViewer } from '@client/features/auth/get-viewer';

import { Account } from './views/account';
import { Loading } from './views/loading';

const ProfilePage = () => {
  document.title = 'Профиль';

  const { viewer } = useViewer();
  const content = useMemo(() => {
    if (!viewer) {
      return <Loading />;
    }

    return <Account user={viewer} />;
  }, [viewer]);

  return <div>{content}</div>;
};

export default ProfilePage;
