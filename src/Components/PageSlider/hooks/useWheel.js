import { useEffect, useRef } from "react";

const THRESHOLD = 80;

const LOCK_TIME = 800;

export default function useWheel({ next, prev }) {
  const accumulator = useRef(0);

  const locked = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (locked.current) {
        return;
      }

      let delta = e.deltaY;

      // normalize macOS trackpad
      if (Math.abs(delta) < 1) {
        return;
      }

      accumulator.current += delta;

      if (accumulator.current > THRESHOLD) {
        accumulator.current = 0;

        locked.current = true;

        next();

        setTimeout(() => {
          locked.current = false;
        }, LOCK_TIME);
      }

      if (accumulator.current < -THRESHOLD) {
        accumulator.current = 0;

        locked.current = true;

        prev();

        setTimeout(() => {
          locked.current = false;
        }, LOCK_TIME);
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [next, prev]);
}
