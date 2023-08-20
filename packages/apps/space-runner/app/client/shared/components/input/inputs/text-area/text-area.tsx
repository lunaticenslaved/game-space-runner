import { useState, ChangeEventHandler, useCallback } from 'react';

import { InputWrapper, InputWrapperProps } from '../../components';

import styles from './text-area.module.scss';

export type TextAreaProps = {
  name: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
} & Omit<InputWrapperProps, 'children'>;

export const TextArea = ({
  error,
  label,
  name,
  value: valueProp = '',
  onChange,
}: TextAreaProps) => {
  const [value, setValue] = useState(valueProp);

  // TODO уже было в text-input
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    e => {
      const { value: newValue } = e.target;

      setValue(newValue);

      if (onChange) onChange(e);
    },
    [onChange]
  );

  return (
    <InputWrapper label={label} error={error}>
      <textarea name={name} value={value} onChange={handleChange} className={styles.input} />
    </InputWrapper>
  );
};
