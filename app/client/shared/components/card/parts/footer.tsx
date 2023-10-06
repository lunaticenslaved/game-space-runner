import { PropsWithChildren } from 'react';

export const Footer = ({ children }: PropsWithChildren) => {
  return <div className="card__footer card__part">{children}</div>;
};
