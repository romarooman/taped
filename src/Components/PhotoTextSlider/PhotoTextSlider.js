import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PhotoTextSlider.module.css";

export default function PhotoTextSlider({
  slides = [],
  height = 560, // ✅ выше
  radius = 18,
  wheelThresholdMs = 420,
  showOverlayOnTouch = true,
  slideWidth = 52, // ✅ % ширины контейнера (половина + чуть)
  gap = 12, // ✅ gap в px
}) {
  const isReady = slides && slides.length > 0;
  const isLoop = slides.length > 1;

  // build looped list: [last, ...slides, first]
  const loopSlides = useMemo(() => {
    if (!isReady) return [];
    if (!isLoop) return slides;
    const first = slides[0];
    const last = slides[slides.length - 1];
    return [last, ...slides, first];
  }, [slides, isReady, isLoop]);

  // displayIndex: индекс внутри loopSlides
  // start at 1 (первый реальный слайд) если loop, иначе 0
  const [displayIndex, setDisplayIndex] = useState(isLoop ? 1 : 0);
  const [transitionOn, setTransitionOn] = useState(true);
  const [hoverRealIndex, setHoverRealIndex] = useState(-1);

  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const lastWheelAt = useRef(0);

  // на изменение количества слайдов — ресет
  useEffect(() => {
    setTransitionOn(true);
    setDisplayIndex(isLoop ? 1 : 0);
    setHoverRealIndex(-1);
  }, [isLoop, slides.length]);

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      (navigator?.maxTouchPoints ?? 0) > 0 ||
      window.matchMedia?.("(pointer: coarse)")?.matches
    );
  }, []);

  const realIndex = useMemo(() => {
    if (!isReady) return 0;
    if (!isLoop) return Math.min(displayIndex, slides.length - 1);
    // displayIndex: 1..slides.length => 0..slides.length-1
    if (displayIndex === 0) return slides.length - 1; // last clone
    if (displayIndex === slides.length + 1) return 0; // first clone
    return displayIndex - 1;
  }, [displayIndex, slides.length, isLoop, isReady]);

  const goToDisplayIndex = (nextIdx) => {
    if (!isReady) return;
    if (!isLoop) {
      const clamped = Math.max(0, Math.min(nextIdx, slides.length - 1));
      setDisplayIndex(clamped);
      return;
    }
    setDisplayIndex(nextIdx);
  };

  const next = () => {
    if (!isReady) return;
    if (!isLoop) return;
    setTransitionOn(true);
    goToDisplayIndex(displayIndex + 1);
  };

  const prev = () => {
    if (!isReady) return;
    if (!isLoop) return;
    setTransitionOn(true);
    goToDisplayIndex(displayIndex - 1);
  };

  // wheel navigation
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !isLoop) return;

    const onWheel = (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelAt.current < wheelThresholdMs) return;
      lastWheelAt.current = now;

      const dy = e.deltaY;
      if (Math.abs(dy) < 6) return;

      if (dy > 0) next();
      else prev();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isLoop, displayIndex, wheelThresholdMs]); // eslint-disable-line react-hooks/exhaustive-deps

  // swipe navigation
  const touch = useRef({ startX: 0, startY: 0, dragging: false });

  const onTouchStart = (e) => {
    if (!isLoop) return;
    const t = e.touches?.[0];
    if (!t) return;
    touch.current = { startX: t.clientX, startY: t.clientY, dragging: true };
  };

  const onTouchMove = (e) => {
    if (!isLoop) return;
    const t = e.touches?.[0];
    if (!t || !touch.current.dragging) return;

    const dx = t.clientX - touch.current.startX;
    const dy = t.clientY - touch.current.startY;

    // реагируем только на горизонтальный свайп
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) e.preventDefault();
  };

  const onTouchEnd = (e) => {
    if (!isLoop) return;
    if (!touch.current.dragging) return;
    touch.current.dragging = false;

    const changed = e.changedTouches?.[0];
    if (!changed) return;

    const dx = changed.clientX - touch.current.startX;
    const dy = changed.clientY - touch.current.startY;
    if (Math.abs(dy) > Math.abs(dx)) return;

    const swipe = 40;
    if (dx <= -swipe) next();
    else if (dx >= swipe) prev();
  };

  // после анимации: если мы на клоне — прыгаем на реальный без transition
  useEffect(() => {
    if (!isLoop) return;
    const track = trackRef.current;
    if (!track) return;

    const onEnd = () => {
      if (displayIndex === 0) {
        // были на last clone -> прыжок на last real
        setTransitionOn(false);
        setDisplayIndex(slides.length);
      } else if (displayIndex === slides.length + 1) {
        // были на first clone -> прыжок на first real
        setTransitionOn(false);
        setDisplayIndex(1);
      }
    };

    track.addEventListener("transitionend", onEnd);
    return () => track.removeEventListener("transitionend", onEnd);
  }, [displayIndex, slides.length, isLoop]);

  // когда выключили transition для "прыжка" — включаем обратно на следующий кадр
  useEffect(() => {
    if (!isLoop) return;
    if (transitionOn) return;
    const id = requestAnimationFrame(() => setTransitionOn(true));
    return () => cancelAnimationFrame(id);
  }, [transitionOn, isLoop]);

  // overlay показываем:
  // - на touch: только на активном реальном
  // - на desktop: по hover на реальном
  const overlayOnReal = (ri) => {
    if (isTouchDevice) return showOverlayOnTouch && ri === realIndex;
    return ri === hoverRealIndex;
  };

  if (!isReady) return null;

  return (
    <section
      ref={rootRef}
      className={styles.root}
      style={{
        height,
        borderRadius: radius,
        "--slideW": `${slideWidth}%`,
        "--gap": `${gap}px`,
        "--r": `${radius}px`,
        "--i": displayIndex,
        "--t": transitionOn ? "1" : "0",
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div ref={trackRef} className={styles.track}>
        {(isLoop ? loopSlides : slides).map((s, i) => {
          // i — индекс в loopSlides
          // real index:
          // loop: i=0 -> last, i=1..n -> 0..n-1, i=n+1 -> 0
          let ri = 0;
          if (!isLoop) ri = i;
          else if (i === 0) ri = slides.length - 1;
          else if (i === slides.length + 1) ri = 0;
          else ri = i - 1;

          const overlayOn = overlayOnReal(ri);

          return (
            <div
              className={styles.slide}
              key={`${s.id ?? ri}-${i}`}
              onMouseEnter={() => setHoverRealIndex(ri)}
              onMouseLeave={() => setHoverRealIndex(-1)}
            >
              <img className={styles.img} src={s.image} alt={s.alt ?? ""} />

              <div
                className={`${styles.overlay} ${
                  overlayOn ? styles.overlayOn : ""
                }`}
                aria-hidden={!overlayOn}
              >
                <div className={styles.quoteMarkLeft}>“</div>
                <div className={styles.quoteMarkRight}>”</div>

                <div className={styles.overlayInner}>
                  {s.quote && <p className={styles.quote}>{s.quote}</p>}

                  <div className={styles.meta}>
                    {s.name && <div className={styles.name}>{s.name}</div>}
                    {s.role && <div className={styles.role}>{s.role}</div>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* dots (по реальным слайдам) */}
      {slides.length > 1 && (
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${
                i === realIndex ? styles.dotActive : ""
              }`}
              onClick={() => {
                if (!isLoop) return setDisplayIndex(i);
                setTransitionOn(true);
                setDisplayIndex(i + 1); // real -> display
              }}
              aria-label={`Slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </section>
  );
}
