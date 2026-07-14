import React from "react";
import styles from "./ImagesOnly.module.css";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";
import MobileCta from "../MobileCta/MobileCta";
import usePageAnimation from "../PageSlider/hooks/usePageAnimation";
import { motion } from "framer-motion";
import { fadeUp } from "../PageSlider/hooks/PageAnimations";

const ImagesOnly = ({ one, brands }) => {
  const animationKey = usePageAnimation();
  return (
    <div className={styles.hero}>
      <div className={styles.mobileCtaWrap}>
        <MobileCta targetId="book" />
      </div>

      <img className={styles.heroBg} src={one} alt="" />

      <motion.div
        key={`${animationKey}-title`}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className={styles.heroText}
      >
        <div className={styles.heroTitle}>
          full-service studio
          <br />
          for actors, creatives & professionals
        </div>

        <div className={styles.heroRowBottom}>
          <img className={styles.heroBadge} src={brands} alt="" />
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className={styles.heroActionsFixed}
      >
        <BookAShootButton targetId="book" />
        <ChatPill />
      </motion.div>
    </div>
  );
};

export default ImagesOnly;
