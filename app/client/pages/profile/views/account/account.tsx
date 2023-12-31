import { UserComponent } from '@client/entities/user';
import { useDialog } from '@libs/uikit/components/dialog';
import { InfoEditor } from '@client/features/viewer/edit-info';
import { PasswordEditor } from '@client/features/viewer/edit-password';
import { AvatarEditor } from '@client/features/viewer/edit-avatar';
import { Button } from '@libs/uikit/components/button';
import { User } from '@shared/models/user';

import styles from './account.module.scss';

export interface AccountProps {
  user: User;
}

export const Account = ({ user }: AccountProps) => {
  const editUserDialog = useDialog();
  const editPasswordDialog = useDialog();
  const editAvatarDialog = useDialog();

  return (
    <div className={styles.page}>
      {editUserDialog.isOpen && (
        <InfoEditor user={user} dialog={editUserDialog} onSuccess={editUserDialog.close} />
      )}

      {editPasswordDialog.isOpen && (
        <PasswordEditor dialog={editPasswordDialog} onSuccess={editPasswordDialog.close} />
      )}

      {editAvatarDialog.isOpen && (
        <AvatarEditor dialog={editAvatarDialog} onSuccess={editAvatarDialog.close} />
      )}

      <div className={styles.content}>
        <UserComponent.Avatar link={user.avatars[0]?.link} />
        <h4 className={styles.userName}>{user.login}</h4>

        <UserComponent.InfoList {...user} />

        <div className={styles.buttons}>
          <Button width="full" onClick={editUserDialog.open}>
            Изменить данные
          </Button>
          <Button width="full" onClick={editPasswordDialog.open}>
            Изменить пароль
          </Button>
          <Button width="full" onClick={editAvatarDialog.open}>
            Изменить аватар
          </Button>
        </div>
      </div>
    </div>
  );
};
