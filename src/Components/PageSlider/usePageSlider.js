import { useContext } from "react";
import PageSliderContext from "./PageSliderContext";

export default function usePageSlider() {
  const context = useContext(PageSliderContext);

  if (!context) {
    throw new Error("usePageSlider must be used inside <PageSlider>");
  }

  return context;
}
