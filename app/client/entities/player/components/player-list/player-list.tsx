import { Avatar } from '@client/shared/components/avatar';
import { Input } from '@client/shared/components/input';
import { Player } from '@shared/models';
import { PlayerIcon } from '@client/entities/player';

import styles from './player-list.module.scss';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

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
    <>
      <div className={styles.searchBar}>
        <Input.TextInput
          name="search"
          placeholder="Поиск игрока"
          value={search}
          onChange={updateSearch}
        />
      </div>
      <div className={styles.playListBody}>
        {filteredPlayers.map(({ id, user, score }) => (
          <div key={id} className={styles.playerCard}>
            <div className={styles.playerInfo}>
              <Avatar
                link={user.avatars[0]?.link}
                size={64}
                placeholderIcon={<PlayerIcon.Placeholder />}
              />
              <div className={styles.playerName}>{user.login}</div>
            </div>
            <div className={styles.playerScore}>{score} points</div>
          </div>
        ))}
      </div>
    </>
  );
};
