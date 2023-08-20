import { useMemo } from 'react';

import { useViewer } from '@client/features/viewer/get-viewer';
import { DefaultLayout } from '@client/widgets/page-layouts';

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

  return (
    <DefaultLayout>
      <div className={style.page}>{content}</div>
    </DefaultLayout>
  );
};

export default ProfilePage;
