import './elevation.scss';

export type Elevation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const elevate = ({ elevation }: ElevationProp) => {
  if (!elevation) {
    return undefined;
  }

  return `elevate-${elevation}`;
};

export type ElevationProp = {
  elevation?: Elevation;
};
