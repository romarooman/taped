import { useEffect, useRef } from "react";

const SWIPE_THRESHOLD = 70;

const LOCK_TIME = 800;

export default function useTouch({ next, prev }) {
  const startY = useRef(null);

  const locked = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) {
        return;
      }

      startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (startY.current === null) {
        return;
      }

      const endY = e.changedTouches[0].clientY;

      const delta = startY.current - endY;

      startY.current = null;

      if (Math.abs(delta) < SWIPE_THRESHOLD) {
        return;
      }

      if (locked.current) {
        return;
      }

      locked.current = true;

      if (delta > 0) {
        // свайп вверх
        next();
      } else {
        // свайп вниз
        prev();
      }

      setTimeout(() => {
        locked.current = false;
      }, LOCK_TIME);
    };

    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);

      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);
}
