import React, { createContext, useContext } from "react";

const PageSliderContext = createContext(null);

export function PageSliderProvider({ children, value }) {
  return (
    <PageSliderContext.Provider value={value}>
      {children}
    </PageSliderContext.Provider>
  );
}

export function usePageSlider() {
  const context = useContext(PageSliderContext);

  if (!context) {
    throw new Error("usePageSlider must be used inside PageSliderProvider");
  }

  return context;
}

export default PageSliderContext;
