import { Link } from 'react-router-dom';
import cn from 'classnames';
import block from 'bem-cn-lite';

import './anchor.scss';

const bAnchor = block('anchor');

export type AnchorProps = {
  to: string;
  routerLink?: boolean;
  className?: string;
  children?: string;
};

export const Anchor = ({ className, routerLink, children, ...otherProps }: AnchorProps) => {
  const classes = cn(className, bAnchor());

  if (routerLink) {
    return <Link {...otherProps} className={classes} />;
  }

  return (
    <a href={otherProps.to} className={classes}>
      {children}
    </a>
  );
};
