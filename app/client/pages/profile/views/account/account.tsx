import { UserEntity } from '@client/entities/user';
import { useDialog } from '@client/shared/components/dialog';
import { InfoEditor } from '@client/features/viewer/edit-info';
import { PasswordEditor } from '@client/features/viewer/edit-password';
import { AvatarEditor } from '@client/features/viewer/edit-avatar';
import { Button } from '@client/shared/components/button';
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
        <InfoEditor
          user={user}
          isOpen={editUserDialog.isOpen}
          onClose={editUserDialog.close}
          onUpdated={editUserDialog.close}
        />
      )}

      {editPasswordDialog.isOpen && (
        <PasswordEditor
          isOpen={editPasswordDialog.isOpen}
          onClose={editPasswordDialog.close}
          onSubmitSuccess={editPasswordDialog.close}
          onSubmitError={() => alert('cannot update password')}
        />
      )}

      {editAvatarDialog.isOpen && (
        <AvatarEditor
          isOpen={editAvatarDialog.isOpen}
          onClose={editAvatarDialog.close}
          onSubmitSuccess={editAvatarDialog.close}
        />
      )}

      <div className={styles.content}>
        <UserEntity.Avatar link={user.avatars[0]?.link} />
        <h4 className={styles.userName}>{user.login}</h4>

        <UserEntity.InfoList {...user} />

        <div className={styles.buttons}>
          <Button onClick={editUserDialog.open}>Изменить данные</Button>
          <Button onClick={editPasswordDialog.open}>Изменить пароль</Button>
          <Button onClick={editAvatarDialog.open}>Изменить аватар</Button>
        </div>
      </div>
    </div>
  );
};
