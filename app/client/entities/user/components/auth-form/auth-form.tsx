import { PropsWithChildren } from 'react';

import { Button } from '@client/shared/components/button';
import { StyledLink } from '@client/shared/components/styled-link';
import { FormItem } from '@libs/validate-react';

import styles from './auth-form.module.scss';

export type AuthFormProps = {
  title: string;
  submitText: string;
  authError?: string;
  appendText: string;
  appendLink: string;
  appendLinkText: string;
  form: FormItem;
} & PropsWithChildren;

export const AuthForm = ({
  title,
  authError,
  submitText,
  appendText,
  appendLink,
  appendLinkText,
  form,
  children,
}: AuthFormProps) => {
  const { props: formProps, isSubmitting } = form;

  return (
    <div className={styles.root}>
      <form className={styles.form} {...formProps}>
        <h1 className={styles.header}>{title}</h1>

        {children}

        <div className={styles.error}>{authError}</div>

        <Button className={styles.button} type="submit" width="full" loading={isSubmitting}>
          {submitText}
        </Button>

        <div className={styles.append}>
          <p>
            {appendText} <StyledLink to={appendLink}>{appendLinkText}</StyledLink>
          </p>
        </div>
      </form>
    </div>
  );
};
