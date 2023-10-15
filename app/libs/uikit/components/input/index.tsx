import { TextInput, TextInputProps } from './inputs/text-input';
import { TextArea, TextAreaProps } from './inputs/text-area';
import { Select, SelectProps } from './inputs/select';
import { FileInput, FileInputProps } from './inputs/file-input';

import './inputs.scss';

export class Input {
  public static Select(props: SelectProps) {
    return <Select {...props} />;
  }

  public static TextInput(props: TextInputProps) {
    return <TextInput {...props} />;
  }

  public static TextArea(props: TextAreaProps) {
    return <TextArea {...props} />;
  }

  public static File(props: FileInputProps) {
    return <FileInput {...props} />;
  }
}
