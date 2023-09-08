import { useMemo } from 'react';

import { AccessLevel } from '@client/shared/navigation';
import { useAppSelector } from '@client/shared/store';

export const useViewer = () => {
  const viewer = useAppSelector(state => state.state.viewer);
  const isAuthenticated = useMemo(() => !!viewer, [viewer]);
  const access = useMemo(() => {
    const list = [AccessLevel.Common];

    if (isAuthenticated) {
      list.push(AccessLevel.Private);
    } else {
      list.push(AccessLevel.Public);
    }

    return list;
  }, [isAuthenticated]);

  return {
    viewer,
    isAuthenticated,
    access,
  };
};
