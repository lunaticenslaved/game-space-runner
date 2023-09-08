import { RefObject, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  elem: RefObject<T>,
  handler: () => void,
  attached: boolean,
) {
  useEffect(() => {
    if (!attached) return;

    const handleClick = (e: Event) => {
      if (!elem.current || !e.target) return;
      if (!elem.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [elem, handler, attached]);
}
