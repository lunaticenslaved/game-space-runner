import { useState, ChangeEventHandler, useCallback, TextareaHTMLAttributes } from 'react';

import { InputWrapper, InputWrapperElementProps } from '../components/input-wrapper';
import { bInput } from '../classes';

type TextAreaOwnProps = Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'rows'>;

export type TextAreaProps = InputWrapperElementProps<
  {
    name: string;
    value?: string;
  } & TextAreaOwnProps
>;

export const TextArea = ({
  error,
  label,
  name,
  value: valueProp = '',
  onChange,
  rows,
}: TextAreaProps) => {
  const [value, setValue] = useState(valueProp);

  // TODO уже было в text-input
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    e => {
      const { value: newValue } = e.target;

      setValue(newValue);

      if (onChange) onChange(e);
    },
    [onChange],
  );

  return (
    <InputWrapper label={label} error={error}>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        className={bInput()}
        rows={rows}
      />
    </InputWrapper>
  );
};
