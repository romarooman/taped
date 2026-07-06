export const initialState = {
  pageIndex: 0,
  horizontalIndex: 0,
};

export default function reducer(state, action) {
  switch (action.type) {
    case "NEXT": {
      const { pages } = action;

      const page = pages[state.pageIndex];

      /*
        Если текущая страница горизонтальная
        и есть еще внутренние слайды
      */

      if (
        page?.direction === "horizontal" &&
        state.horizontalIndex < page.slides.length - 1
      ) {
        return {
          ...state,

          horizontalIndex: state.horizontalIndex + 1,
        };
      }

      /*
        иначе идем на следующую вертикальную страницу
      */

      if (state.pageIndex < pages.length - 1) {
        return {
          pageIndex: state.pageIndex + 1,

          horizontalIndex: 0,
        };
      }

      return state;
    }

    case "PREV": {
      const { pages } = action;

      const page = pages[state.pageIndex];

      /*
        если внутри горизонтального блока
        есть предыдущий слайд
      */

      if (page?.direction === "horizontal" && state.horizontalIndex > 0) {
        return {
          ...state,

          horizontalIndex: state.horizontalIndex - 1,
        };
      }

      /*
        иначе возвращаемся вверх
      */

      if (state.pageIndex > 0) {
        const previousPage = pages[state.pageIndex - 1];

        return {
          pageIndex: state.pageIndex - 1,

          horizontalIndex:
            previousPage?.direction === "horizontal"
              ? previousPage.slides.length - 1
              : 0,
        };
      }

      return state;
    }

    case "GOTO": {
      return {
        pageIndex: action.index,

        horizontalIndex: 0,
      };
    }

    default:
      return state;
  }
}
