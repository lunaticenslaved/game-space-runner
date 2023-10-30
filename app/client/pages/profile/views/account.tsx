import { UserComponent } from '@client/entities/user';
import { PasswordEditor } from '@client/features/viewer/edit-password';
import { AvatarEditor } from '@client/features/viewer/edit-avatar';
import { User } from '@shared/models/user';

import { useDialog } from '@client/shared/hooks';
import { InfoEditor } from '@client/features/viewer/edit-info';
import { Button, Typography } from '@mui/material';

export interface AccountProps {
  user: User;
}

export const Account = ({ user }: AccountProps) => {
  const editUserDialog = useDialog();
  const editPasswordDialog = useDialog();
  const editAvatarDialog = useDialog();

  return (
    <div>
      {editUserDialog.isOpen && (
        <InfoEditor user={user} dialog={editUserDialog} onSuccess={editUserDialog.close} />
      )}

      {editPasswordDialog.isOpen && (
        <PasswordEditor dialog={editPasswordDialog} onSuccess={editPasswordDialog.close} />
      )}

      {editAvatarDialog.isOpen && (
        <AvatarEditor dialog={editAvatarDialog} onSuccess={editAvatarDialog.close} />
      )}

      <div>
        <UserComponent.Avatar src={user.avatars[0]?.link} />
        <Typography variant="h4" component="h4">
          {user.login}
        </Typography>

        <UserComponent.InfoList {...user} />

        <div>
          <Button className="w-full" onClick={editUserDialog.open}>
            Изменить данные
          </Button>
          <Button className="w-full" onClick={editPasswordDialog.open}>
            Изменить пароль
          </Button>
          <Button className="w-full" onClick={editAvatarDialog.open}>
            Изменить аватар
          </Button>
        </div>
      </div>
    </div>
  );
};
