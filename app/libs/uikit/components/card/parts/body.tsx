import { PropsWithChildren } from 'react';

export const Body = ({ children }: PropsWithChildren) => {
  return <div className="card__body card__part">{children}</div>;
};
