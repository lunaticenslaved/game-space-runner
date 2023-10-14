import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { Card, CardProps } from '../card';

import { DialogInterface } from './hooks';

import './dialog.scss';

export type DialogProps = Pick<CardProps, 'maxWidth' | 'minWidth' | 'width' | 'loading'> & {
  contentClass?: string;
  dialog?: DialogInterface;
  children: ReactNode;
};

const OVERLAY_CLASS = 'dialog-overlay';
const DIALOG = 'dialog';
const DIALOG__OPEN = 'dialog--open';
const DIALOG_CONTENT = 'dialog__content';

export const Dialog = ({ dialog, contentClass, children, ...cardProps }: DialogProps) => {
  const { close } = dialog || {};
  const [localOpen, setLocalOpen] = useState(!!dialog?.isOpen);

  useEffect(() => {
    setLocalOpen(!!dialog?.isOpen);
  }, [dialog?.isOpen]);

  useEffect(() => {
    if (close && !localOpen) {
      close();
    }
  }, [close, localOpen]);

  const closeDialogOnOverlayClick: React.MouseEventHandler = useCallback(e => {
    const element = e.target as HTMLElement;

    if (element.classList.contains(OVERLAY_CLASS)) {
      setLocalOpen(false);
    }
  }, []);

  const overlayClass = cn(DIALOG, OVERLAY_CLASS, { [DIALOG__OPEN]: localOpen });
  const contentClasses = cn(DIALOG_CONTENT, contentClass);

  return createPortal(
    <div onClick={closeDialogOnOverlayClick} className={overlayClass}>
      <Card className={contentClasses} {...cardProps} tag="dialog">
        {children}
      </Card>
    </div>,
    document.body,
  );
};

Dialog.Title = Card.Title;
Dialog.Subtitle = Card.Subtitle;
Dialog.Body = Card.Body;
Dialog.Actions = Card.Actions;
