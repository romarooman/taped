import { useContext } from "react";
import PageSliderContext from "../PageSliderContext";


export default function usePageAnimation() {
  const { animationKey } = useContext(PageSliderContext);

  return animationKey;
}
