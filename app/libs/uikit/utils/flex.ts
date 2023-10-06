import cn from 'classnames';

import './flex.scss';

export type AlignItems = 'start' | 'center' | 'end' | 'stretch';
export type JustifyContent = 'start' | 'center' | 'end' | 'space-around' | 'space-between';
export type FlexGrow = 0 | 1;
export type FlexShrink = 0 | 1;

// eslint-disable-next-line prettier/prettier
export type ColsSpan = |1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24;

export const cols = (cols?: ColsSpan) => {
  return `cols-${cols}`;
};

export type FlexParentProps = {
  flexDirection?: 'row' | 'column';
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
};

export type FlexChildProps = {
  grow?: FlexGrow;
  shrink?: FlexShrink;
};

export function flex({
  alignItems,
  justifyContent,
  grow,
  shrink,
  flexDirection,
}: FlexParentProps & FlexChildProps) {
  return cn({
    [`flex-direction-${flexDirection}`]: !!flexDirection,
    [`align-items-${alignItems}`]: !!alignItems,
    [`justify-content-${justifyContent}`]: !!justifyContent,
    [`grow-${grow}`]: typeof grow === 'number',
    [`shrink-${shrink}`]: typeof shrink === 'number',
  });
}
