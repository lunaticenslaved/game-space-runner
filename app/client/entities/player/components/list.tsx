import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

import { Input } from '@libs/uikit/components/input';
import { Player } from '@shared/models';
import { PlayerItem } from './item';

export type PlayerListProps = {
  players: Player[];
};

export const PlayerList = ({ players }: PlayerListProps) => {
  const [search, setSearch] = useState('');
  const updateSearch: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setSearch(e.target.value || '');
  }, []);

  const filteredPlayers = useMemo(() => {
    if (!search) {
      return players;
    }

    const clearedSearch = search.toLowerCase().trim();

    return players.filter(({ user }) => {
      return user.login.toLowerCase().includes(clearedSearch);
    });
  }, [players, search]);

  return (
    <div className="flex flex-col">
      <div className="grow-0">
        <Input.TextInput
          name="search"
          placeholder="Поиск игрока"
          value={search}
          onChange={updateSearch}
        />
      </div>

      <div className="overflow-y-auto grow -mx-4">
        {filteredPlayers.map(player => (
          <PlayerItem key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};
