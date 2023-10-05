import { ReactNode } from 'react';
import cn from 'classnames';

import { FlexProps, MarginAndPaddingProps, flex, marginAndPadding } from '../../utils';

import './container.scss';
import { BackgroundProps, background } from '../../utils/background';

export type ContainerProps = FlexProps &
  MarginAndPaddingProps &
  BackgroundProps & {
    children?: ReactNode;
  };

export const Container = ({ children, ...otherProps }: ContainerProps) => {
  return (
    <div
      className={cn(
        flex(otherProps),
        marginAndPadding(otherProps),
        background(otherProps),
        'flex',
      )}>
      {children}
    </div>
  );
};
