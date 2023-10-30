import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import { Grid, Link, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { FormItem } from '@libs/validate-react';

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
    <Grid container className="w-full h-full" justifyContent="center" alignItems="center">
      <form {...formProps}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>

        {children}

        <Typography color="error">{authError}</Typography>

        <LoadingButton type="submit" className="w-full" loading={isSubmitting}>
          {submitText}
        </LoadingButton>

        <Grid container>
          <Typography variant="subtitle1" paragraph>
            {appendText}

            <NavLink to={appendLink}>
              <Link>{appendLinkText}</Link>
            </NavLink>
          </Typography>
        </Grid>
      </form>
    </Grid>
  );
};
