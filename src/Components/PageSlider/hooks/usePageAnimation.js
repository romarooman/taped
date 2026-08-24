import { useContext } from "react";
import PageSliderContext from "../PageSliderContext";

export default function usePageAnimation() {
  const context = useContext(PageSliderContext);

  if (!context) {
    return "standalone";
  }

  return context.animationKey || "standalone";
}
