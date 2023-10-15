import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import { InputWrapper, InputWrapperElementProps } from '../components/input-wrapper';
import { bInput } from '../classes';

export type TextInputProps = InputWrapperElementProps<{
  name: string;
  value?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

export const TextInput = ({
  error,
  label,
  name,
  placeholder,
  value: valueProp = '',
  type = 'text',
  onChange,
}: TextInputProps) => {
  const [value, setValue] = useState(valueProp);
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setValue(e.target.value);
      if (onChange) onChange(e);
    },
    [onChange],
  );

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <InputWrapper label={label} error={error}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={bInput()}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};
