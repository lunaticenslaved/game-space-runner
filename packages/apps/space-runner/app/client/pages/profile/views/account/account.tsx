import { Avatar, InfoList, User } from '@client/entities/user';
import { useDialog } from '@client/shared/components/dialog';
import {
  useEditUserInfo,
  InfoEditor,
  useEditAvatar,
  AvatarEditor,
  useEditPassword,
  PasswordEditor,
} from '@client/features/edit-viewer';
import { Button } from '@client/shared/components/button';

import styles from './Account.module.scss';

export interface AccountProps {
  user: User;
}

export const Account = ({ user }: AccountProps) => {
  const editUserDialog = useDialog();
  const editPasswordDialog = useDialog();
  const editAvatarDialog = useDialog();
  const { mutate: updateUser } = useEditUserInfo({
    onSuccess: editUserDialog.close,
    onError: () => alert('Cannot update user'),
  });
  const { mutate: updateAvatar } = useEditAvatar({
    onSuccess: editAvatarDialog.close,
    onError: () => alert('Cannot update avatar'),
  });
  const { mutate: updatePassword } = useEditPassword({
    onSuccess: editAvatarDialog.close,
    onError: () => alert('Cannot update avatar'),
  });

  return (
    <div className={styles.page}>
      {editUserDialog.isOpen && (
        <InfoEditor
          user={user}
          isOpen={editUserDialog.isOpen}
          onSubmit={updateUser}
          onClose={editUserDialog.close}
        />
      )}

      {editPasswordDialog.isOpen && (
        <PasswordEditor
          isOpen={editPasswordDialog.isOpen}
          onSubmit={updatePassword}
          onClose={editPasswordDialog.close}
        />
      )}

      {editAvatarDialog.isOpen && (
        <AvatarEditor
          isOpen={editAvatarDialog.isOpen}
          onSubmit={updateAvatar}
          onClose={editAvatarDialog.close}
        />
      )}

      <div className={styles.content}>
        <Avatar link={user.avatar} />
        <h4 className={styles.userName}>
          {user.display_name ? user.display_name : `${user.firstName} ${user.secondName}`}
        </h4>

        <InfoList {...user} />

        <div className={styles.buttons}>
          <Button onClick={editUserDialog.open}>Изменить данные</Button>
          <Button onClick={editPasswordDialog.open}>Изменить пароль</Button>
          <Button onClick={editAvatarDialog.open}>Изменить аватар</Button>
        </div>
      </div>
    </div>
  );
};
