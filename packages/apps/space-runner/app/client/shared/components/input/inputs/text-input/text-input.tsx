import { ChangeEventHandler, useCallback, useState } from 'react';

import { InputWrapper, InputWrapperProps } from '../../components';

import styles from './text-input.module.scss';

export type TextInputProps = {
  name: string;
  value?: string;
  type?: 'text' | 'password';
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & Omit<InputWrapperProps, 'children'>;

export const TextInput = ({
  error,
  label,
  name,
  value: valueProp = '',
  type = 'text',
  onChange,
}: TextInputProps) => {
  const [value, setValue] = useState(valueProp);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const { value: newValue } = e.target;

      setValue(newValue);

      if (onChange) onChange(e);
    },
    [onChange]
  );

  return (
    <InputWrapper label={label} error={error}>
      <input
        type={type}
        name={name}
        value={value}
        className={styles.input}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};
