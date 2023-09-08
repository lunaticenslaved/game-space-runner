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

import styles from './button.module.scss';

type OwnButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
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
  className: classNameProp,
  ...otherProps
}: ButtonProps) => {
  const className = useMemo(() => {
    return cn(styles.root, classNameProp, {
      [styles.loading]: loading,
    });
  }, [classNameProp, loading]);
  const props = useMemo(() => {
    return { ...otherProps, className };
  }, [className, otherProps]);
  const content = useMemo(() => {
    return (
      <Fragment>
        <div className={styles.content}>{children}</div>
        <div className={styles.spinner}>{loading ? <Spinner /> : null}</div>
      </Fragment>
    );
  }, [children, loading]);

  if ('href' in props) {
    const { href } = props;
    return (
      <Link to={href} {...props}>
        {content}
      </Link>
    );
  }

  const { type } = props;

  return (
    <button type={type} {...props}>
      {content}
    </button>
  );
};
