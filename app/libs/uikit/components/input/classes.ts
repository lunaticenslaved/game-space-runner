import block from 'bem-cn-lite';
import cn from 'classnames';

import { rounded } from '../../utils';

const bInput_ = block('field__input');

export const bInput = (args?: Parameters<typeof bInput_>) =>
  cn(block('field__input')(...(args || [])), rounded('sm'));
