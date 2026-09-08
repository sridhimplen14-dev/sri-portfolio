import { useEffect } from 'react';
import { useIsTouch } from './useMedia';

/** Throttled pointer glow via CSS variables on `documentElement`. Disabled on touch. */
export function usePointerGlow() {
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) {
      document.documentElement.style.removeProperty('--pointer-x');
      document.documentElement.style.removeProperty('--pointer-y');
      document.documentElement.classList.remove('has-pointer-glow');
      return;
    }

    document.documentElement.classList.add('has-pointer-glow');
    let raf = 0;
    let latestX = 0;
    let latestY = 0;
    let pending = false;

    const flush = () => {
      pending = false;
      document.documentElement.style.setProperty('--pointer-x', `${latestX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${latestY}px`);
    };

    const onMove = (e: PointerEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(flush);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-pointer-glow');
    };
  }, [isTouch]);
}
