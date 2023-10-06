import './rounded.scss';

export type Rounded = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'pill' | 'circle';

export const rounded = ({ rounded }: RoundedProps) => {
  if (!rounded) {
    return undefined;
  }

  return `rounded-${rounded}`;
};

export type RoundedProps = {
  rounded?: Rounded;
};
