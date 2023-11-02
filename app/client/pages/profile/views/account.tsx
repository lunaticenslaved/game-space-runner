import { UserComponent } from '@client/entities/user';
import { PasswordEditor } from '@client/features/viewer/edit-password';
import { AvatarEditor } from '@client/features/viewer/edit-avatar';
import { User } from '@shared/models/user';

import { useDialog } from '@client/shared/hooks';
import { InfoEditor } from '@client/features/viewer/edit-info';
import { Button, Grid, Typography } from '@mui/material';

export interface AccountProps {
  user: User;
}

export const Account = ({ user }: AccountProps) => {
  const editUserDialog = useDialog();
  const editPasswordDialog = useDialog();
  const editAvatarDialog = useDialog();

  return (
    <>
      {editUserDialog.isOpen && (
        <InfoEditor user={user} dialog={editUserDialog} onSuccess={editUserDialog.close} />
      )}

      {editPasswordDialog.isOpen && (
        <PasswordEditor dialog={editPasswordDialog} onSuccess={editPasswordDialog.close} />
      )}

      {editAvatarDialog.isOpen && (
        <AvatarEditor dialog={editAvatarDialog} onSuccess={editAvatarDialog.close} />
      )}

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        className="h-full w-full">
        <UserComponent.Avatar className="h-64 w-64" src={user.avatars[0]?.link} alt={user.login} />
        <Typography variant="h4" component="h4" className="mt-8">
          {user.login}
        </Typography>

        <UserComponent.InfoList user={user} className="mt-12 w-96" />

        <div className="mt-12">
          <Button className="w-full mt-4" variant="contained" onClick={editUserDialog.open}>
            Изменить данные
          </Button>
          <Button className="w-full mt-4" variant="contained" onClick={editPasswordDialog.open}>
            Изменить пароль
          </Button>
          <Button className="w-full mt-4" variant="contained" onClick={editAvatarDialog.open}>
            Изменить аватар
          </Button>
        </div>
      </Grid>
    </>
  );
};
