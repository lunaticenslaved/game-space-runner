import { Avatar } from '@client/shared/components/avatar';
import { Input } from '@client/shared/components/input';
import { Player } from '@shared/models';
import { PlayerIcon } from '@client/entities/player';

import styles from './player-list.module.scss';

export type PlayerListProps = {
  players: Player[];
};

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <>
      <div className={styles.searchBar}>
        <Input.TextInput name="search" label="Поиск игрока" />
      </div>
      <div className={styles.playListHeader}>
        <div className={styles.playListHeaderCol}>Позиция</div>
        <div className={styles.playListHeaderCol}>Игрок</div>
        <div className={styles.playListHeaderCol}>Кол-во очков</div>
      </div>
      <div className={styles.playListBody}>
        {players.map(({ id, user, score }) => (
          <div key={id} className={styles.playerCard}>
            <div className={styles.playerCardCol}>
              <div className={styles.playerInfo}>
                <Avatar link={user.avatars[0]?.link} placeholderIcon={<PlayerIcon.Placeholder />} />
                <div className={styles.playerName}>{user.login}</div>
              </div>
            </div>
            <div className={styles.playerCardCol}>{score}</div>
          </div>
        ))}
      </div>
    </>
  );
};
