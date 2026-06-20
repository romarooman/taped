import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./HorizontalScroll.module.css";

const NAV_H = 96;
const WHEEL_DELAY = 700;

export default function HorizontalScroll({ children }) {
  const slides = useMemo(() => React.Children.toArray(children), [children]);

  const totalSlides = slides.length;

  const [index, setIndex] = useState(0);

  const targetRef = useRef(null);
  const lockedRef = useRef(false);

  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const finalHeight = vh - NAV_H;

  useEffect(() => {
    const el = targetRef.current;

    if (!el) return;

    const onWheel = (e) => {
      const rect = el.getBoundingClientRect();

      const inView = rect.top <= NAV_H + 5 && rect.bottom >= finalHeight;

      if (!inView) return;

      if (lockedRef.current) {
        e.preventDefault();
        return;
      }

      const dy = e.deltaY;

      if (Math.abs(dy) < 1) return;

      // вперед
      if (dy > 0 && index < totalSlides - 1) {
        e.preventDefault();

        lockedRef.current = true;

        setIndex((p) => p + 1);

        setTimeout(() => {
          lockedRef.current = false;
        }, WHEEL_DELAY);
      }

      // назад
      if (dy < 0 && index > 0) {
        e.preventDefault();

        lockedRef.current = true;

        setIndex((p) => p - 1);

        setTimeout(() => {
          lockedRef.current = false;
        }, WHEEL_DELAY);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

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
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
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
              <div className={styles.slideInner}>{slide}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
