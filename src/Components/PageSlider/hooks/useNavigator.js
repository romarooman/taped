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
    (index) => {
      if (index < 0 || index >= pages.length) {
        return;
      }

      dispatch({
        type: "GOTO",

        index,
      });
    },
    [dispatch, pages.length],
  );

  return {
    next,

    prev,

    goTo,
  };
}
