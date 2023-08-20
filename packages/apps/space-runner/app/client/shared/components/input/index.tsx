import { TextInput, TextInputProps } from './inputs/text-input';
import { TextArea, TextAreaProps } from './inputs/text-area';
import { Select, SelectProps, SelectItem } from './inputs/select';

export class Input {
  public static Select<T extends SelectItem>(props: SelectProps<T>) {
    return <Select<T> {...props} />;
  }

  public static TextInput(props: TextInputProps) {
    return <TextInput {...props} />;
  }

  public static TextArea(props: TextAreaProps) {
    return <TextArea {...props} />;
  }
}
