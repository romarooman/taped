import React, { useEffect, useMemo, useReducer, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import styles from "./PageSlider.module.css";

import reducer, { initialState } from "./PageSliderReducer";

import { PageSliderProvider } from "./PageSliderContext";

import useNavigator from "./hooks/useNavigator";
import useWheel from "./hooks/useWheel";
import useTouch from "./hooks/useTouch";

import navigation from "../../navigation";

const DESKTOP_NAV_HEIGHT = 96;
const MOBILE_NAV_HEIGHT = 80;
const MOBILE_BREAKPOINT = 600;

export default function PageSlider({ children, header = null }) {
  const pages = useMemo(() => {
    return React.Children.toArray(children).map((page, index) => {
      const props = page.props || {};

      return {
        id: props.id !== undefined ? props.id : index,

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

  useTouch({
    next,
    prev,
  });

  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * Синхронизация URL со слайдером.
   *
   * Например:
   * /service -> страница services,
   * horizontalIndex 1 -> компонент Service.
   */
  useEffect(() => {
    const navigationItem = navigation.find(
      (item) => item.path === location.pathname,
    );

    if (!navigationItem) {
      return;
    }

    goTo(navigationItem.pageIndex, navigationItem.horizontalIndex || 0);
  }, [location.pathname, goTo]);

  const navHeight =
    viewport.width <= MOBILE_BREAKPOINT
      ? MOBILE_NAV_HEIGHT
      : DESKTOP_NAV_HEIGHT;

  const sliderHeight = Math.max(viewport.height - navHeight, 0);

  const animationKey = [state.pageIndex, state.horizontalIndex].join("-");

  return (
    <PageSliderProvider
      value={{
        state,
        next,
        prev,
        goTo,
        pages,
        animationKey,
      }}
    >
      {header}

      <div
        className={styles.viewport}
        style={{
          height: `${sliderHeight}px`,
        }}
      >
        <AnimatePresence mode="sync">
          {pages.map((page, pageIndex) => {
            const isActive = pageIndex === state.pageIndex;

            const isBefore = pageIndex < state.pageIndex;

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
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : isBefore ? -120 : 120,
                  pointerEvents: isActive ? "auto" : "none",
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
                aria-hidden={!isActive}
              >
                {isActive && (
                  <motion.div
                    className={styles.horizontalTrack}
                    animate={{
                      x:
                        page.direction === "horizontal"
                          ? -(state.horizontalIndex * viewport.width)
                          : 0,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {page.slides.map((slide, slideIndex) => {
                      const isSlideActive =
                        slideIndex === state.horizontalIndex;

                      return (
                        <motion.div
                          key={slideIndex}
                          className={styles.slide}
                          animate={{
                            scale:
                              page.direction === "horizontal"
                                ? isSlideActive
                                  ? 1
                                  : 0.85
                                : 1,

                            opacity:
                              page.direction === "horizontal"
                                ? isSlideActive
                                  ? 1
                                  : 0.7
                                : 1,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            width: `${viewport.width}px`,
                            height: "100%",
                          }}
                        >
                          <div className={styles.slideContent}>{slide}</div>
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
