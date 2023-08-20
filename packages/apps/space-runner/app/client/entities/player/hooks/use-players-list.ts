import { useCallback, useState } from 'react';

import { Player } from '..';

export const usePlayersList = () => {
  const [players] = useState<Player[]>([]);

  const list = useCallback(() => {
    return players;
  }, [players]);

  return { list };
};
