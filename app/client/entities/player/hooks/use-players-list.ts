import { useCallback, useState } from 'react';

import { Player } from '..';

export const usePlayersList = () => {
  const [players] = useState<Player[]>([]);

  const query = useCallback(() => {
    return players;
  }, [players]);

  return { query, players };
};
