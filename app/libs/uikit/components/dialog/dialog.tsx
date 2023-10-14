import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import './dialog.scss';

export type DialogProps = {
  isOpen: boolean;
  contentClass?: string;
  onClose?: () => void;
  children: ReactNode;
};

const OVERLAY_CLASS = 'dialog-overlay';

export const Dialog = ({ isOpen, onClose, contentClass, children }: DialogProps) => {
  const [localOpen, setLocalOpen] = useState(isOpen);

  useEffect(() => {
    setLocalOpen(isOpen);
    return;
  }, [isOpen]);

  useEffect(() => {
    if (onClose && !localOpen) {
      onClose();
    }
  }, [localOpen, onClose]);

  const closeDialogOnOverlayClick: React.MouseEventHandler = useCallback(e => {
    const element = e.target as HTMLElement;

    if (element.classList.contains(OVERLAY_CLASS)) {
      setLocalOpen(false);
    }
  }, []);

  return createPortal(
    <div
      onClick={closeDialogOnOverlayClick}
      className={cn({
        dialog: true,
        [OVERLAY_CLASS]: true,
        'dialog--open': localOpen,
      })}>
      <dialog className={cn('dialog__content', contentClass)}>{children}</dialog>
    </div>,
    document.body,
  );
};
