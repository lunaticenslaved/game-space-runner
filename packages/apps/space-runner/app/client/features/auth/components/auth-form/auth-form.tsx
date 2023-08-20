import { ReactNode } from 'react';

import { Button } from '@client/shared/components/button';
import { UseFormProps, useForm } from '@libs/validate-react';

import styles from './auth-form.module.scss';

export type AuthFormProps = {
  children: ReactNode;
  title: string;
  submitText: string;
  authError?: string;
  onOAuthSubmit: () => void;
} & UseFormProps;

export const AuthForm = ({
  children,
  title,
  authError,
  submitText,
  onOAuthSubmit,
  ...formProps
}: AuthFormProps) => {
  const { props, isSubmitting } = useForm(formProps);

  return (
    <div className={styles.root}>
      <form className={styles.form} {...props}>
        <h1 className={styles.header}>{title}</h1>

        {children}

        <div className={styles.error}>{authError}</div>

        <Button className={styles.button} type="submit" loading={isSubmitting}>
          {submitText}
        </Button>
        <Button className={styles.button} disabled={isSubmitting} onClick={onOAuthSubmit}>
          Войти с Yandex
        </Button>
      </form>
    </div>
  );
};
