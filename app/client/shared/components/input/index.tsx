import { TextInput, TextInputProps } from './inputs/text-input';
import { TextArea, TextAreaProps } from './inputs/text-area';
import { Select, SelectProps, SelectValueType } from './inputs/select';
import { FileInput, FileInputProps } from './inputs/file-input';

export class Input {
  public static Select<T extends SelectValueType>(props: SelectProps<T>) {
    return <Select<T> {...props} />;
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
