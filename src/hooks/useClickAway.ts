import { RefObject, useEffect } from 'react';

type ElementRef = RefObject<HTMLElement>;

export function useClickAway(refs: ElementRef | ElementRef[], callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const elements = Array.isArray(refs) ? refs : [refs];
      const isOutside = elements.every(ref => {
        return ref.current && !ref.current.contains(event.target as Node);
      });

      if (isOutside) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
}