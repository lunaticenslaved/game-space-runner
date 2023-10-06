import { PropsWithChildren } from 'react';

export const Subtitle = ({ children }: PropsWithChildren) => {
  return <div className="card__subtitle card__part">{children}</div>;
};
