import { Link, LinkProps } from 'react-router-dom';
import cn from 'classnames';
import block from 'bem-cn-lite';

import './anchor.scss';

const bAnchor = block('anchor');

export type AnchorProps = LinkProps;

export const Anchor = ({ className, ...otherProps }: AnchorProps) => {
  return <Link {...otherProps} className={cn(className, bAnchor())} />;
};
