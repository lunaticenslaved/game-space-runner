import { PropsWithChildren } from 'react';

export const Footer = ({ children }: PropsWithChildren) => {
  return <div className="card__footer">{children}</div>;
};
