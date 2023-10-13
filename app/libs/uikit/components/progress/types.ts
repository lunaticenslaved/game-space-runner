export type ProgressCircularProps = {
  view: 'circle';
  size?: number;
  color?: string;
  className?: string;
};

export type ProgressLinearProps = {
  view: 'line';
  size?: number;
  color?: string;
  className?: string;
};

export type ProgressProps = ProgressCircularProps | ProgressLinearProps;
