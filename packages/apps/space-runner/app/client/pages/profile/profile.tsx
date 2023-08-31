import { useMemo } from 'react';

import { useViewer } from '@client/features/auth/get-viewer';

import { Account, Loading } from './views';
import style from './profile.module.scss';

const ProfilePage = () => {
  document.title = 'Профиль';

  const { viewer } = useViewer();
  const content = useMemo(() => {
    if (!viewer) {
      return <Loading />;
    }

    return <Account user={viewer} />;
  }, []);

  return <div className={style.page}>{content}</div>;
};

export default ProfilePage;
