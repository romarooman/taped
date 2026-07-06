import React, { useEffect, useMemo, useReducer, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import styles from "./PageSlider.module.css";

import reducer, { initialState } from "./PageSliderReducer";

import { PageSliderProvider } from "./PageSliderContext";

import useNavigator from "./hooks/useNavigator";

import useWheel from "./hooks/useWheel";

const NAV_H = 96;

export default function PageSlider({ children }) {
  const pages = useMemo(() => {
    return React.Children.toArray(children).map((page, index) => {
      const props = page.props;

      return {
        id: props.id || index,

        direction: props.direction || "vertical",

        slides:
          props.direction === "horizontal"
            ? React.Children.toArray(props.children)
            : [props.children],
      };
    });
  }, [children]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { next, prev, goTo } = useNavigator(state, dispatch, pages);

  useWheel({
    next,
    prev,
  });

  const [vw, setVw] = useState(window.innerWidth);

  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const resize = () => {
      setVw(window.innerWidth);

      setVh(window.innerHeight);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const height = vh - NAV_H;

  return (
    <PageSliderProvider
      value={{
        state,

        next,

        prev,

        goTo,
      }}
    >
      <div
        className={styles.viewport}
        style={{
          height: `${height}px`,
        }}
      >
        <AnimatePresence mode="sync">
          {pages.map((page, pageIndex) => {
            const active = pageIndex === state.pageIndex;

            const before = pageIndex < state.pageIndex;

            const after = pageIndex > state.pageIndex;

            if (!active && !before && !after) {
              return null;
            }

            return (
              <motion.section
                key={page.id}
                className={styles.page}
                initial={{
                  scale: 0.85,

                  opacity: 0,

                  y: 100,
                }}
                animate={{
                  scale: active ? 1 : 0.65,

                  opacity: active ? 1 : 0,

                  y: active ? 0 : before ? -120 : 120,
                }}
                exit={{
                  scale: 0.85,

                  opacity: 0,

                  y: -120,
                }}
                transition={{
                  duration: 0.75,

                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {active && (
                  <motion.div
                    className={styles.horizontalTrack}
                    animate={{
                      x:
                        page.direction === "horizontal"
                          ? -(state.horizontalIndex * vw)
                          : 0,
                    }}
                    transition={{
                      duration: 0.7,

                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {page.slides.map((slide, slideIndex) => {
                      const slideActive = slideIndex === state.horizontalIndex;

                      return (
                        <motion.div
                          key={slideIndex}
                          className={styles.slide}
                          animate={{
                            scale:
                              page.direction === "horizontal"
                                ? slideActive
                                  ? 1
                                  : 0.85
                                : 1,
                          }}
                          transition={{
                            duration: 0.7,
                          }}
                          style={{
                            width: `${vw}px`,

                            height: "100%",
                          }}
                        >
                          {slide}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </PageSliderProvider>
  );
}
