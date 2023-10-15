import { MouseEventHandler, ReactNode, createRef, useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import block from 'bem-cn-lite';

import { useToggle, useClickOutside } from '../../hooks';

import './menu.scss';

export type MenuProps = {
  activator: ReactNode;
  children: ReactNode;
  closeOnClick?: boolean;
};

const bMenu = block('menu');

type Position = {
  x: number;
  y: number;
  width: number;
};

export const Menu = ({ children, activator, closeOnClick }: MenuProps) => {
  const expander = useToggle();
  const activatorRef = createRef<HTMLDivElement>();
  const menuRef = createRef<HTMLDivElement>();
  const [position, setPosition] = useState<Position>();

  const openMenu: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      expander.turnOn();
      const { bottom, left, width } = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: left,
        y: bottom,
        width,
      });
    },
    [expander],
  );
  const closeMenu = useCallback(() => {
    setPosition(undefined);
    expander.turnOff();
  }, [expander]);

  const contentStyle = useMemo(() => {
    return {
      top: position?.y ? `${position.y}px` : undefined,
      left: position?.x ? `${position.x}px` : undefined,
      width: position?.width ? `${position.width}px` : undefined,
    };
  }, [position]);

  useClickOutside({
    element: [menuRef, activatorRef],
    handler: closeMenu,
    isActive: expander.isOn,
  });

  return (
    <>
      <div ref={activatorRef} onClick={openMenu}>
        {activator}
      </div>
      {expander.isOn &&
        createPortal(
          <div
            ref={menuRef}
            className={bMenu()}
            style={contentStyle}
            onClick={closeOnClick ? closeMenu : undefined}>
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};
