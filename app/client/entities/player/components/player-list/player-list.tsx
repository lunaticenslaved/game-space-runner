import { Avatar } from '@client/entities/user';

import { Player } from '../..';

import styles from './player-list.module.scss';

export type PlayerListProps = {
  players: Player[];
};

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <>
      <div className={styles.playListHeader}>
        <div className={styles.playListHeaderCol}>Позиция</div>
        <div className={styles.playListHeaderCol}>Игрок</div>
        <div className={styles.playListHeaderCol}>Кол-во очков</div>
      </div>
      <div className={styles.playListBody}>
        {players.map(({ id, position, imgSrc, login, score }) => (
          <div key={id} className={styles.playerCard}>
            <div className={styles.playerCardCol}>{position}</div>
            <div className={styles.playerCardCol}>
              <div className={styles.playerInfo}>
                <Avatar link={imgSrc} />
                <div className={styles.playerName}>{login}</div>
              </div>
            </div>
            <div className={styles.playerCardCol}>{score}</div>
          </div>
        ))}
      </div>
    </>
  );
};
