export const getSize = (size: string | number | undefined) => {
  if (size === undefined) {
    return undefined;
  }

  if (typeof size === 'string') {
    return size;
  }

  return `${size}px`;
};
