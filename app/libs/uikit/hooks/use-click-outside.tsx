import { RefObject, useEffect } from 'react';

export type UseClickOutsideProps<T extends HTMLElement = HTMLElement> = {
  element: RefObject<T> | RefObject<T>[];
  isActive: boolean;
  handler(): void;
};

export function useClickOutside<T extends HTMLElement = HTMLElement>({
  element,
  isActive,
  handler,
}: UseClickOutsideProps<T>) {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!isActive) return;
      if (!e.target) return;

      const array = Array.isArray(element) ? element : [element];

      if (array.every(elem => !elem.current?.contains(e.target as Node))) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [element, handler, isActive]);
}
