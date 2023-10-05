import './rounded.scss';

export type Radius = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'pill' | 'circle';

export const rounded = (val: Radius) => {
  return `rounded-${val}`;
};

export type RadiusProp = {
  radius?: Radius;
};
