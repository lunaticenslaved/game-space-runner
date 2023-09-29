import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Fragment,
  PropsWithChildren,
  useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Spinner } from '../spinner';

import './button.scss';

type OwnButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  width?: 'full' | 'auto';
} & PropsWithChildren;

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
  ...otherProps
}: ButtonProps) => {
  const props: ButtonProps = useMemo(
    () => ({
      ...otherProps,
      className: cn('button', className, {
        'button--loading': loading,
        'button--full-width': width === 'full',
        'button--auto-width': width === 'auto',
      }),
    }),
    [className, loading, otherProps, width],
  );
  const content = useMemo(() => {
    return (
      <Fragment>
        <div className="button__content">{children}</div>
        <div className="button__spinner">{loading ? <Spinner /> : null}</div>
      </Fragment>
    );
  }, [children, loading]);

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
