import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./HorizontalScroll.module.css";

const NAV_H = 96;

const HorizontalScroll = ({ children, slidesCount }) => {
  const targetRef = useRef(null);
  const [vw, setVw] = useState(() => window.innerWidth);
  const [vh, setVh] = useState(() => window.innerHeight);

  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const totalSlides = slidesCount ?? slides.length;

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const finalHeight = vh - NAV_H;

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
      <div className={styles.sticky} style={{ height: `${finalHeight}px` }}>
        <motion.div className={styles.track} style={{ x }}>
          {slides.map((slide, index) => (
            <div
              className={styles.slide}
              key={index}
              style={{ height: `${finalHeight}px` }}
            >
              <div className={styles.imageWrapper}>
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