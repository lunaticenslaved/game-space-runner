import { ChangeEventHandler, useCallback, useState } from 'react';

import { InputWrapper, InputWrapperElementProps } from '../components/input-wrapper';
import { bInput } from '../classes';

export type FileInputProps = InputWrapperElementProps<{
  name: string;
  value?: File;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

export const FileInput = ({ error, label, name, value: valueProp, onChange }: FileInputProps) => {
  const [, setValue] = useState(valueProp);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const { files } = e.target;

      setValue(files?.item(0) || undefined);

      if (onChange) onChange(e);
    },
    [onChange],
  );

  return (
    <InputWrapper label={label} error={error}>
      <input type="file" name={name} className={bInput()} onChange={handleChange} />
    </InputWrapper>
  );
};
