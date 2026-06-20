import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./HorizontalScroll.module.css";

const NAV_H = 96;
const THRESHOLD = 200;
const ANIMATION_TIME = 600;

export default function HorizontalScroll({ children }) {
  const slides = useMemo(() => React.Children.toArray(children), [children]);

  const totalSlides = slides.length;

  const [index, setIndex] = useState(0);

  const targetRef = useRef(null);
  const accumulatorRef = useRef(0);
  const lockedRef = useRef(false);

  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const finalHeight = vh - NAV_H;

  useEffect(() => {
    const el = targetRef.current;

    if (!el) return;

    const nextSlide = () => {
      if (index >= totalSlides - 1) return;

      lockedRef.current = true;

      setIndex((prev) => prev + 1);

      setTimeout(() => {
        lockedRef.current = false;
      }, ANIMATION_TIME);
    };

    const prevSlide = () => {
      if (index <= 0) return;

      lockedRef.current = true;

      setIndex((prev) => prev - 1);

      setTimeout(() => {
        lockedRef.current = false;
      }, ANIMATION_TIME);
    };

    const onWheel = (e) => {
      const rect = el.getBoundingClientRect();

      const inView =
        rect.top <= NAV_H + 5 &&
        rect.bottom >= finalHeight;

      if (!inView) return;

      if (lockedRef.current) {
        e.preventDefault();
        return;
      }

      accumulatorRef.current += e.deltaY;

      if (
        accumulatorRef.current > THRESHOLD &&
        index < totalSlides - 1
      ) {
        e.preventDefault();

        nextSlide();

        accumulatorRef.current = 0;
      }

      if (
        accumulatorRef.current < -THRESHOLD &&
        index > 0
      ) {
        e.preventDefault();

        prevSlide();

        accumulatorRef.current = 0;
      }

      // защита от инерции трекпада macOS
      if (
        (index === 0 && accumulatorRef.current < 0) ||
        (index === totalSlides - 1 &&
          accumulatorRef.current > 0)
      ) {
        accumulatorRef.current = 0;
      }
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [index, totalSlides, finalHeight]);

  return (
    <section
      ref={targetRef}
      className={styles.carousel}
      style={{
        height: `${finalHeight}px`,
      }}
    >
      <div
        className={styles.sticky}
        style={{
          height: `${finalHeight}px`,
        }}
      >
        <motion.div
          className={styles.track}
          animate={{
            x: -(index * vw),
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={styles.slide}
              style={{
                height: `${finalHeight}px`,
              }}
            >
              <div className={styles.slideInner}>
                {slide}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}