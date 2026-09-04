import React from "react";
import styles from "./ImagesListRow.module.css";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";
import MobileCta from "../MobileCta/MobileCta";
import { motion } from "framer-motion";
import usePageAnimation from "../PageSlider/hooks/usePageAnimation";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
} from "../PageSlider/hooks/PageAnimations";

const ImagesListRow = ({
  fimage,
  bg = "#CCCCCC",
  title,
  subtitle,
  order = "image-first",
  subtitleSize = "clamp(24px, 3.5vw, 24px)",
}) => {
  const isImageFirst = order === "image-first";
  const animationKey = usePageAnimation();

  const TextBlock = (
    <motion.div
      className={styles.imgCenterText}
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      {title && <div className={styles.titleText}>{title}</div>}
      {subtitle && (
        <div style={{ fontSize: subtitleSize }} className={styles.subtitleText}>
          {subtitle}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className={styles.imagesRow} key={animationKey}>
      <div className={styles.mobileCtaWrap}>
        <MobileCta targetId="book" />
      </div>

      {isImageFirst ? (
        <>
          <motion.div
            className={styles.imgCard}
            key={animationKey}
            variants={fadeLeft}
            initial="hidden"
            animate="show"
          >
            <img className={styles.img} src={fimage} alt="img" />
          </motion.div>

          <div
            className={`${styles.imgCard} ${styles.bgCard}`}
            style={{ background: bg }}
          >
            {TextBlock}
          </div>
        </>
      ) : (
        <>
          <div
            className={`${styles.imgCard} ${styles.bgCard}`}
            initial="hidden"
            animate="show"
            style={{ background: bg }}
          >
            {TextBlock}
          </div>

          <motion.div
            key={animationKey}
            variants={fadeRight}
            className={styles.imgCard}
            initial="hidden"
            animate="show"
          >
            <img className={styles.img} src={fimage} alt="img" />
          </motion.div>
        </>
      )}

      <motion.div
        className={styles.rowActions}
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <BookAShootButton targetId="book" />
        <ChatPill />
      </motion.div>
    </div>
  );
};

export default ImagesListRow;
