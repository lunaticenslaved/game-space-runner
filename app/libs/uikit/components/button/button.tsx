import { AnchorHTMLAttributes, ButtonHTMLAttributes, Fragment, ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { RoundedProps, useStyles } from '../../utils';
import { useTheme } from '../../theme';
import { Progress } from '../progress';

import './button.scss';

type OwnButtonProps = RoundedProps & {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  width?: 'full' | 'auto';
  children?: ReactNode;
};

type NarrowButtonProps = OwnButtonProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;
type NarrowLinkProps = OwnButtonProps & {
  href: string;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;

export type ButtonProps = NarrowButtonProps | NarrowLinkProps;

function isLink(props: ButtonProps): props is NarrowLinkProps {
  return 'href' in props;
}

function isButton(props: ButtonProps): props is NarrowButtonProps {
  return !isLink(props);
}

export const Button = ({
  loading,
  children,
  className,
  width = 'auto',
  disabled,
  rounded = 'md',
  ...otherProps
}: ButtonProps) => {
  const { theme } = useTheme();
  const { classes } = useStyles({
    ...otherProps,
    rounded,
    className: cn('button', className, {
      'button--disabled': disabled,
      'button--loading': loading,
      'button--full-width': width === 'full',
      'button--auto-width': width === 'auto',
    }),
  });
  const props: ButtonProps = useMemo(
    () => ({ ...otherProps, disabled, className: classes }),
    [classes, disabled, otherProps],
  );
  const content = useMemo(() => {
    return (
      <Fragment>
        <div className="button__content">{children}</div>
        <div className="button__spinner">
          {loading ? (
            <Progress
              view="circle"
              color={
                disabled
                  ? theme.components.button.spinnerColorDisabled
                  : theme.components.button.spinnerColor
              }
            />
          ) : null}
        </div>
      </Fragment>
    );
  }, [
    children,
    disabled,
    loading,
    theme.components.button.spinnerColor,
    theme.components.button.spinnerColorDisabled,
  ]);

  if (isLink(props)) {
    const { href } = props;

    return (
      <Link to={href} {...props}>
        {content}
      </Link>
    );
  }

  if (isButton(props)) {
    const { type } = props;

    return (
      <button type={type} {...props}>
        {content}
      </button>
    );
  }

  return null;
};
