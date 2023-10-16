import { ReactNode } from 'react';
import block from 'bem-cn-lite';
import cn from 'classnames';

import './input-wrapper.scss';

type InputWrapperOwnProps = {
  label?: string;
  error?: string | null;
  className?: string;
  children: ReactNode;
};

export type InputWrapperElementProps<T extends object> = Omit<
  InputWrapperOwnProps,
  'children' | 'className'
> &
  T;

const bWrapper = block('input-wrapper');
const bFieldLabel = block('input-wrapper__field-label');

export const InputWrapper = ({ label, error, className, children }: InputWrapperOwnProps) => {
  return (
    <div className={cn(bWrapper(), className)}>
      <label className={bFieldLabel()}>
        {label && <p className={bFieldLabel('label')}>{label}</p>}
        <div className={bFieldLabel('field')}>{children}</div>
      </label>
      <p className={bWrapper('error')}>{error}</p>
    </div>
  );
};
