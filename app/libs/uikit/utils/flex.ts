import cn from 'classnames';

import './flex.scss';

export type AlignContent = 'start' | 'center' | 'end';
export type JustifyContent = 'start' | 'center' | 'end' | 'space-around' | 'space-between';
export type FlexGrow = 0 | 1;
export type FlexShrink = 0 | 1;

// eslint-disable-next-line prettier/prettier
export type ColsSpan = |1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24;

export const cols = (cols?: ColsSpan) => {
  return `cols-${cols}`;
};

export type FlexProps = {
  alignContent?: AlignContent;
  justifyContent?: JustifyContent;
  grow?: FlexGrow;
  shrink?: FlexShrink;
};

export function flex({ alignContent, justifyContent, grow, shrink }: FlexProps) {
  return cn({
    [`align-content-${alignContent}`]: !!alignContent,
    [`justify-content-${justifyContent}`]: !!justifyContent,
    [`grow-${flex}`]: typeof grow === 'number',
    [`shrink-${shrink}`]: typeof shrink === 'number',
  });
}
