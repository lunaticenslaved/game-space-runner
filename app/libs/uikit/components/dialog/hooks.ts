import { useCallback, useMemo, useState } from 'react';

export interface DialogInterface {
  isOpen: boolean;
  open(): void;
  close(): void;
  setOpen(value: boolean): void;
}

export const useDialog = (initialOpen?: boolean): DialogInterface => {
  const [isOpen, setOpen] = useState(Boolean(initialOpen));

  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);

  return useMemo(
    () => ({
      isOpen,
      setOpen,
      open,
      close,
    }),
    [close, isOpen, open],
  );
};
