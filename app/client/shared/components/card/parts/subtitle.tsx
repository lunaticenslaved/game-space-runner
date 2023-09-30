import { PropsWithChildren } from 'react';

export const Subtitle = ({ children }: PropsWithChildren) => {
  return <div className="card__subtitle">{children}</div>;
};
