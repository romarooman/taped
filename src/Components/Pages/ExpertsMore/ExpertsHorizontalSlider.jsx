import React, { useEffect, useRef, useState } from "react";

import ImagesListRow from "../../ImagesListRow/ImagesListRow";
import styles from "./ExpertsHorizontalSlider.module.css";

const WHEEL_THRESHOLD = 60;
const SWIPE_THRESHOLD = 60;
const TRANSITION_TIME = 700;

export default function ExpertsHorizontalSlider({ sections = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const wheelDeltaRef = useRef(0);
  const lockedRef = useRef(false);
  const touchStartYRef = useRef(null);
  const transitionTimerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(transitionTimerRef.current), []);

  useEffect(() => {
    const isSliderAtTop = () => {
      const slider = sliderRef.current;

      if (!slider) {
        return false;
      }

      const rect = slider.getBoundingClientRect();

      return rect.top >= -2 && rect.top <= 2;
    };

    const changeSlide = (direction) => {
      lockedRef.current = true;

      setActiveIndex((currentIndex) =>
        Math.min(
          Math.max(currentIndex + direction, 0),
          Math.max(sections.length - 1, 0),
        ),
      );

      wheelDeltaRef.current = 0;
      transitionTimerRef.current = window.setTimeout(() => {
        lockedRef.current = false;
      }, TRANSITION_TIME);
    };

    const handleWheel = (event) => {
      if (!isSliderAtTop() || Math.abs(event.deltaY) < 1) {
        wheelDeltaRef.current = 0;
        return;
      }

      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const canMoveForward = event.deltaY > 0 && activeIndex < sections.length - 1;
      const canMoveBack = event.deltaY < 0 && activeIndex > 0;

      if (!canMoveForward && !canMoveBack) {
        wheelDeltaRef.current = 0;
        return;
      }

      event.preventDefault();

      wheelDeltaRef.current += event.deltaY;

      if (wheelDeltaRef.current >= WHEEL_THRESHOLD) {
        wheelDeltaRef.current = 0;
        changeSlide(1);
      } else if (wheelDeltaRef.current <= -WHEEL_THRESHOLD) {
        wheelDeltaRef.current = 0;
        changeSlide(-1);
      }
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = null;
      if (event.touches.length === 1 && isSliderAtTop()) {
        touchStartYRef.current = event.touches[0].clientY;
      }
    };

    const handleTouchMove = (event) => {
      if (touchStartYRef.current === null || event.touches.length !== 1) {
        return;
      }

      const delta = touchStartYRef.current - event.touches[0].clientY;
      const canMoveForward = delta > 0 && activeIndex < sections.length - 1;
      const canMoveBack = delta < 0 && activeIndex > 0;

      if (lockedRef.current || canMoveForward || canMoveBack) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event) => {
      if (touchStartYRef.current === null || lockedRef.current) {
        touchStartYRef.current = null;
        return;
      }

      const delta = touchStartYRef.current - event.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (Math.abs(delta) < SWIPE_THRESHOLD) {
        return;
      }

      if (delta > 0 && activeIndex < sections.length - 1) {
        changeSlide(1);
      } else if (delta < 0 && activeIndex > 0) {
        changeSlide(-1);
      }
    };

    const handleTouchCancel = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [activeIndex, sections.length]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <section
      ref={sliderRef}
      className={styles.slider}
      aria-label="Expert presentation"
    >
      <div
        className={styles.track}
        style={{ transform: `translate3d(-${activeIndex * 100}vw, 0, 0)` }}
      >
        {sections.map((section, index) => (
          <div
            className={styles.slide}
            key={`${section.title}-${index}`}
            aria-hidden={index !== activeIndex}
          >
            <ImagesListRow
              textOn="first"
              fimage={section.image}
              bg="#FFFFFF"
              order="bg-first"
              mobileOrder="image-first"
              title={section.title}
              subtitle={section.subtitle}
              subtitleSize="clamp(4px, 3.5vw, 20px)"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
