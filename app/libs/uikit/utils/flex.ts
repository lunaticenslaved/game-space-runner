import cn from 'classnames';

export type AlignContent = 'start' | 'center' | 'end';
export type JustifyContent = 'start' | 'center' | 'end' | 'space-around' | 'space-between';
export type FlexGrow = 0 | 1;

export type FlexProps = {
  alignContent?: AlignContent;
  justifyContent?: JustifyContent;
  grow?: FlexGrow;
};

export function flex({ alignContent, justifyContent, grow }: FlexProps) {
  return cn({
    [`align-content-${alignContent}`]: !!alignContent,
    [`justify-content-${justifyContent}`]: !!justifyContent,
    [`flex-${flex}`]: typeof grow === 'number',
  });
}
