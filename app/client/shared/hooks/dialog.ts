import { useCallback, useEffect, useMemo, useState } from 'react';

export interface DialogInterface {
  isOpen: boolean;
  open(): void;
  close(): void;
  setOpen(value: boolean): void;
}

export interface UseDialogProps {
  isOpen?: boolean;
  beforeClose?(): boolean | void | Promise<boolean | void>;
  beforeOpen?(): boolean;
}

export const useDialog = (props?: UseDialogProps): DialogInterface => {
  const { beforeClose, beforeOpen, isOpen: isOpenProp } = props || {};
  const [isOpen, setOpen] = useState(!!isOpenProp);

  useEffect(() => setOpen(!!isOpenProp), [isOpenProp]);

  const close = useCallback(async () => {
    const canClose = beforeClose ? await beforeClose() : true;

    if (canClose === undefined || canClose) {
      setOpen(false);
    }
  }, [beforeClose]);
  const open = useCallback(async () => {
    const canOpen = beforeOpen ? await beforeOpen() : true;

    if (canOpen === undefined || canOpen) {
      setOpen(true);
    }
  }, [beforeOpen]);

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
