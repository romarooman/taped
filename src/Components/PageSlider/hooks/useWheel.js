import { useEffect, useRef } from "react";

const THRESHOLD = 80;
const LOCK_TIME = 800;
const EDGE_TOLERANCE = 2;

export default function useWheel({ next, prev }) {
  const accumulator = useRef(0);
  const locked = useRef(false);

  useEffect(() => {
    const findScrollableParent = (target) => {
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
    };

    const canScrollDown = (element) => {
      if (!element) {
        return false;
      }

      const maxScrollTop = element.scrollHeight - element.clientHeight;

      return element.scrollTop < maxScrollTop - EDGE_TOLERANCE;
    };

    const canScrollUp = (element) => {
      if (!element) {
        return false;
      }

      return element.scrollTop > EDGE_TOLERANCE;
    };

    const lock = () => {
      locked.current = true;

      setTimeout(() => {
        locked.current = false;
      }, LOCK_TIME);
    };

    const handleWheel = (e) => {
      const delta = e.deltaY;

      if (Math.abs(delta) < 1) {
        return;
      }

      const scrollable = findScrollableParent(e.target);

      /*
       * =========================================
       * ВНУТРЕННИЙ SCROLL
       * =========================================
       */

      if (scrollable) {
        /*
         * Скроллим вниз.
         *
         * Пока QA ещё можно прокручивать вниз —
         * PageSlider вообще ничего не делает.
         */
        if (delta > 0 && canScrollDown(scrollable)) {
          accumulator.current = 0;

          return;
        }

        /*
         * Скроллим вверх.
         *
         * Пока QA ещё можно прокручивать вверх —
         * PageSlider ничего не делает.
         */
        if (delta < 0 && canScrollUp(scrollable)) {
          accumulator.current = 0;

          return;
        }
      }

      /*
       * =========================================
       * PAGE SLIDER
       * =========================================
       *
       * До этого места доходим только если:
       *
       * 1. внутреннего scroll нет
       *
       * ИЛИ
       *
       * 2. внутренний scroll уже дошёл
       *    до верхней / нижней границы.
       */

      e.preventDefault();

      if (locked.current) {
        return;
      }

      accumulator.current += delta;

      /*
       * Следующий слайд
       */
      if (accumulator.current >= THRESHOLD) {
        accumulator.current = 0;

        lock();

        next();

        return;
      }

      /*
       * Предыдущий слайд
       */
      if (accumulator.current <= -THRESHOLD) {
        accumulator.current = 0;

        lock();

        prev();
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
