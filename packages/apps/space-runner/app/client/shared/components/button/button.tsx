import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Fragment,
  PropsWithChildren,
  useMemo,
} from 'react';
import cn from 'classnames';

import { Spinner } from '../spinner';

import './button.scss';

type OwnButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  view?: 'button' | 'subButton' | 'link';
} & PropsWithChildren;

type HTMLButtonProps = OwnButtonProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;
type HTMLLinkProps = OwnButtonProps & {
  href: string;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;

export type ButtonProps = HTMLButtonProps | HTMLLinkProps;

export const Button = ({
  loading,
  children,
  view = 'button',
  className: classNameProps,
  ...otherProps
}: ButtonProps) => {
  const className = useMemo(() => {
    return cn(classNameProps, {
      basicButton: true,
      'basicButton--link': view === 'link',
      'button--loading': loading,
    });
  }, [classNameProps, loading, view]);
  const props = useMemo(() => ({ ...otherProps, className }), [className, otherProps]);
  const content = useMemo(() => {
    return (
      <Fragment>
        <div className="button__content">{children}</div>
        <div className="button__spinner">{loading ? <Spinner /> : null}</div>
      </Fragment>
    );
  }, [children, loading]);

  if ('href' in props) {
    return content;
  }

  const { type } = props;

  return (
    <button type={type} {...props}>
      {content}
    </button>
  );
};
