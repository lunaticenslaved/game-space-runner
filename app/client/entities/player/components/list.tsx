import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';

import { Player } from '@shared/models';

import { PlayerIcon } from '..';

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
    <Grid container direction="column">
      <Grid flexGrow={0} className="mb-4">
        <TextField
          className="w-full"
          name="search"
          placeholder="Поиск игрока"
          value={search}
          onChange={updateSearch}
        />
      </Grid>

      <Grid flexGrow={1}>
        <List>
          {filteredPlayers.map(player => {
            const { user, score } = player;

            return (
              <ListItem key={player.id} disablePadding>
                <ListItemAvatar>
                  <Avatar src={user.avatars[0]?.link}>
                    <PlayerIcon.Placeholder />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary={user.login} />
                <ListItemText className="!grow-0" primary={`${score} points`} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};
