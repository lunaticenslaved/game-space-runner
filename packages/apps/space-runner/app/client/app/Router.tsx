import { Routes } from 'react-router-dom';

import { Router as HomeRouter } from '@client/pages/home';
import { Router as AuthRouter } from '@client/pages/auth';
import { Router as ForumRouter } from '@client/pages/forum';
import { Router as GameRouter } from '@client/pages/game';
import { Router as LeaderBoardRouter } from '@client/pages/leader-board';
import { Router as ProfileRouter } from '@client/pages/profile';
import { Router as ErrorRouter } from '@client/pages/error';

export const Router = () => {
  return (
    <Routes>
      {HomeRouter}
      {LeaderBoardRouter}
      {ProfileRouter}
      {ForumRouter}
      {AuthRouter}
      {GameRouter}
      {ErrorRouter}
    </Routes>
  );
};
