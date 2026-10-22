import { useEffect } from 'react';

export const useClickOutside = <TElement extends HTMLElement>(
  ref: React.RefObject<TElement | null>,
  onClickOutside: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (target instanceof Node && ref.current && !ref.current.contains(target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClickOutside, ref]);
};
