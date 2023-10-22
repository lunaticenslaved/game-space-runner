export * from './elevation';
export * from './rounded';
export * from './flex';
export * from './width';
export * from './span';

export const getSize = (size: string | number | undefined) => {
  if (size === undefined) {
    return undefined;
  }

  if (typeof size === 'string') {
    return size;
  }

  return `${size}px`;
};
