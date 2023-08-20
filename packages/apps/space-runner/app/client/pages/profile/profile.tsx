import { useViewer } from '@client/features/viewer/get-viewer';

import { Account, Loading } from './views';
import style from './profile.module.scss';

export const ProfilePage = () => {
  document.title = 'Профиль';

  const { viewer } = useViewer();

  if (!viewer) {
    return (
      <div className={style.page}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={style.page}>
      <Account user={viewer} />
    </div>
  );
};
