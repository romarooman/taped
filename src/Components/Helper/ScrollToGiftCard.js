import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToGiftCard = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/service") {
      const el = document.getElementById("service");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

      if (location.pathname === "/contacts") {
      const el = document.getElementById("contacts");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

          if (location.pathname === "/community") {
      const el = document.getElementById("community");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToGiftCard;
