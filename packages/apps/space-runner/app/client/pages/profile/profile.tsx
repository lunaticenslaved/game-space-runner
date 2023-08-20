import { useViewer } from '@hooks/useViewer';

import { Account, Loading } from './views';
import style from './Account.module.scss';

export const AccountPage = () => {
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
