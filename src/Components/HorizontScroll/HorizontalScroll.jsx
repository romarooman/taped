import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./HorizontalScroll.module.css";

const NAV_H = 64;

const HorizontalScroll = ({ children, slidesCount }) => {
  const targetRef = useRef(null);
  const slideContentRefs = useRef([]);
  const [vw, setVw] = useState(() => window.innerWidth);
  const [contentHeight, setContentHeight] = useState(0);

  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const totalSlides = slidesCount ?? slides.length;

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const measure = () => {
      const heights = slideContentRefs.current.map((el) =>
        el ? el.scrollHeight : 0
      );
      const maxHeight = Math.max(...heights, 0);
      setContentHeight(maxHeight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    slideContentRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [slides]);

  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight - NAV_H : 0;

  const finalHeight = Math.max(contentHeight, viewportHeight);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -((totalSlides - 1) * vw)]
  );

  return (
    <section
      className={styles.carousel}
      ref={targetRef}
      style={{ height: `${finalHeight * totalSlides}px` }}
    >
      <div
        className={styles.sticky}
        style={{ height: `${finalHeight}px` }}
      >
        <motion.div className={styles.track} style={{ x }}>
          {slides.map((slide, index) => (
            <div
              className={styles.slide}
              key={index}
              style={{ height: `${finalHeight}px` }}
            >
              <div
                className={styles.imageWrapper}
                ref={(el) => {
                  slideContentRefs.current[index] = el;
                }}
                style={{ height: `${finalHeight}px` }}
              >
                {slide}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;