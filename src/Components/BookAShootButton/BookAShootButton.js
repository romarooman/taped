import React from "react";
import "./BookAShootButton.css";
import usePageAnimation from "../PageSlider/hooks/usePageAnimation";
import { motion } from "framer-motion";
import {
  fadeLeft,
} from "../PageSlider/hooks/PageAnimations";

const BookAShootButton = ({ targetId = "book" }) => {
  const onClick = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const animationKey = usePageAnimation();

  return (
    <motion.div
      key={`${animationKey}-image`}
      variants={fadeLeft}
      initial="hidden"
      animate="show"
    >
      <button className="pillBtn" type="button" onClick={onClick}>
        book a shoot.
      </button>
    </motion.div>
  );
};

export default BookAShootButton;
