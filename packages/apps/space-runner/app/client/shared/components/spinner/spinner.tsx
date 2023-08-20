import { useMemo } from 'react';

import styles from './spinner.module.scss';

export type SpinnerProps = {
  size?: number;
};

export const Spinner = ({ size = 24 }: SpinnerProps) => {
  const style = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
    }),
    [size]
  );

  return <span className={styles.root} style={style} />;
};
