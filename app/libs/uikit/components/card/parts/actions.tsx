import { PropsWithChildren } from 'react';

export const Actions = ({ children }: PropsWithChildren) => {
  return <div className="card__actions card__part">{children}</div>;
};
