import { ProgressCircular } from './view/circular/circular';
import { ProgressLinear } from './view/linear/linear';

import { ProgressProps } from './types';

export const Progress = (props: ProgressProps) => {
  const { view } = props;

  if (view === 'circle') {
    return <ProgressCircular {...props} />;
  }

  if (view === 'line') {
    return <ProgressLinear {...props} />;
  }

  throw new Error('Unknown progress view');
};
