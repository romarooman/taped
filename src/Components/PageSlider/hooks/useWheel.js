import { useEffect, useRef } from "react";

const THRESHOLD = 80;
const LOCK_TIME = 800;
const EDGE_TOLERANCE = 2;

function findInnerScrollElement(target) {
  let element = target;

  while (
    element &&
    element !== document.body &&
    element !== document.documentElement
  ) {
    if (
      element.getAttribute &&
      element.getAttribute("data-inner-scroll") === "true"
    ) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

function canInnerElementScroll(element, deltaY) {
  if (!element) {
    return false;
  }

  const hasOverflow =
    element.scrollHeight > element.clientHeight + EDGE_TOLERANCE;

  if (!hasOverflow) {
    return false;
  }

  const scrollTop = element.scrollTop;
  const maxScrollTop = element.scrollHeight - element.clientHeight;

  /*
   * Колесо вниз.
   * Внутренний список ещё не дошёл до конца.
   */
  if (deltaY > 0) {
    return scrollTop < maxScrollTop - EDGE_TOLERANCE;
  }

  /*
   * Колесо вверх.
   * Внутренний список ещё не дошёл до начала.
   */
  if (deltaY < 0) {
    return scrollTop > EDGE_TOLERANCE;
  }

  return false;
}

export default function useWheel({ next, prev }) {
  const accumulator = useRef(0);
  const locked = useRef(false);
  const unlockTimer = useRef(null);

  useEffect(() => {
    const unlock = () => {
      locked.current = false;
    };

    const lockNavigation = () => {
      locked.current = true;

      if (unlockTimer.current) {
        clearTimeout(unlockTimer.current);
      }

      unlockTimer.current = setTimeout(unlock, LOCK_TIME);
    };

    const handleWheel = (event) => {
      const delta = event.deltaY;

      if (Math.abs(delta) < 1) {
        return;
      }

      const innerScrollElement = findInnerScrollElement(event.target);

      /*
       * Пока внутренний список может прокручиваться,
       * PageSlider вообще не вмешивается.
       */
      if (canInnerElementScroll(innerScrollElement, delta)) {
        accumulator.current = 0;
        return;
      }

      /*
       * Внутреннего скролла нет или он дошёл
       * до своей границы — управление получает PageSlider.
       */
      event.preventDefault();

      if (locked.current) {
        return;
      }

      accumulator.current += delta;

      if (accumulator.current >= THRESHOLD) {
        accumulator.current = 0;
        lockNavigation();
        next();
        return;
      }

      if (accumulator.current <= -THRESHOLD) {
        accumulator.current = 0;
        lockNavigation();
        prev();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);

      if (unlockTimer.current) {
        clearTimeout(unlockTimer.current);
      }
    };
  }, [next, prev]);
}
