import { ChangeEventHandler, useCallback, useState } from 'react';

import { InputWrapper, InputWrapperProps } from '../../components';

import styles from './file-input.module.scss';

export type FileInputProps = {
  name: string;
  value?: File;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & Omit<InputWrapperProps, 'children'>;

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
      <input type="file" name={name} className={styles.input} onChange={handleChange} />
    </InputWrapper>
  );
};
