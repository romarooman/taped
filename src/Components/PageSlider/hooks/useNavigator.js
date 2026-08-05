import { useCallback } from "react";

export default function useNavigator(state, dispatch, pages) {
  const next = useCallback(() => {
    dispatch({
      type: "NEXT",
      pages,
    });
  }, [dispatch, pages]);

  const prev = useCallback(() => {
    dispatch({
      type: "PREV",
      pages,
    });
  }, [dispatch, pages]);

  const goTo = useCallback(
    (pageIndex, horizontalIndex = 0) => {
      if (
        typeof pageIndex !== "number" ||
        pageIndex < 0 ||
        pageIndex >= pages.length
      ) {
        return;
      }

      const targetPage = pages[pageIndex];

      let safeHorizontalIndex = 0;

      if (targetPage && targetPage.direction === "horizontal") {
        const lastSlideIndex = targetPage.slides.length - 1;

        safeHorizontalIndex = Math.max(
          0,
          Math.min(horizontalIndex, lastSlideIndex),
        );
      }

      dispatch({
        type: "GOTO",
        pageIndex,
        horizontalIndex: safeHorizontalIndex,
      });
    },
    [dispatch, pages],
  );

  return {
    next,
    prev,
    goTo,
  };
}
