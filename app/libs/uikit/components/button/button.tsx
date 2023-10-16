import { AnchorHTMLAttributes, ButtonHTMLAttributes, Fragment, ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { RadiusProp, rounded } from '../../utils';
import { useTheme } from '../../theme';
import { Progress } from '../progress';

import './button.scss';

type OwnButtonProps = RadiusProp & {
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
  radius = 'sm',
  ...otherProps
}: ButtonProps) => {
  const { theme } = useTheme();
  const props: ButtonProps = useMemo(
    () => ({
      ...otherProps,
      disabled,
      className: cn('button', className, rounded(radius), {
        'button--disabled': disabled,
        'button--loading': loading,
        'button--full-width': width === 'full',
        'button--auto-width': width === 'auto',
      }),
    }),
    [className, disabled, loading, otherProps, radius, width],
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
