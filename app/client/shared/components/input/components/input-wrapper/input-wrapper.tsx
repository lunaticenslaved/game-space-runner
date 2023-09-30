import { PropsWithChildren } from 'react';

import styles from './input-wrapper.module.scss';

export type InputWrapperProps = PropsWithChildren & {
  label?: string;
  error?: string | null;
};

export const InputWrapper = ({ label, error, children }: InputWrapperProps) => {
  return (
    <div className={styles.root}>
      <label className={styles.wrapper}>
        {label && <p className={styles.label}>{label}</p>}
        <div className={styles.input}>{children}</div>
      </label>
      <p className={styles.error}>{error}</p>
    </div>
  );
};
