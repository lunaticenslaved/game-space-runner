import cn from 'classnames';

import { Spinner } from '@client/shared/components/spinner';

import styles from './PageLoader.module.scss';

export interface ViewPlaceholderProps {
  withBackground?: boolean;
}

export const ViewPlaceholder = ({ withBackground }: ViewPlaceholderProps) => {
  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.withBackground]: withBackground,
      })}>
      <Spinner size={64} />
    </div>
  );
};
