import cn from 'classnames';

import './margin-and-padding.scss';

// eslint-disable-next-line prettier/prettier
type Partitions = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32;

export type Padding = Partitions;
export type Margin = Partitions;

type Sides<T> =
  | T
  | {
      left?: T;
      right?: T;
      top?: T;
      bottom?: T;
      x?: T;
      y?: T;
    };

export type MarginAndPaddingProps = {
  padding?: Sides<Padding>;
  margin?: Sides<Margin>;
};

const generateClasses = (sides: Sides<Partitions>, letter: 'p' | 'm') => {
  if (typeof sides === 'number') {
    return `${letter}-${sides}`;
  }

  return cn({
    [`${letter}t-${sides.top}`]: typeof sides.top === 'number',
    [`${letter}r-${sides.right}`]: typeof sides.right === 'number',
    [`${letter}b-${sides.bottom}`]: typeof sides.bottom === 'number',
    [`${letter}l-${sides.left}`]: typeof sides.left === 'number',
    [`${letter}x-${sides.x}`]: typeof sides.x === 'number',
    [`${letter}y-${sides.y}`]: typeof sides.y === 'number',
  });
};

export const marginAndPadding = ({ padding, margin }: MarginAndPaddingProps) => {
  return cn(
    padding ? generateClasses(padding, 'p') : undefined,
    margin ? generateClasses(margin, 'm') : undefined,
  );
};
