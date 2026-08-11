import React from "react";
import styles from "./ImagesListColumn.module.css";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";
import tapedPng from "../../images/taped_world.png"; // PNG со словом "taped"
import MobileCta from "../MobileCta/MobileCta";
import { motion } from "framer-motion";

import usePageAnimation from "../PageSlider/hooks/usePageAnimation";

import {
  fadeLeft,
  fadeRight,
  fadeUp,
} from "../PageSlider/hooks/PageAnimations";

const ImagesListColumn = ({ fimage }) => {
  const animationKey = usePageAnimation();
  return (
    <div className={styles.imagesCol}>
      <div className={styles.mobileCtaWrap}>
        <MobileCta targetId="book" />
      </div>
      {/* 1-й блок — картинка */}
      <motion.div
        key={`${animationKey}-image`}
        className={styles.imgCard}
        variants={fadeLeft}
        initial="hidden"
        animate="show"
      >
        <img className={`${styles.img}`} src={fimage} alt="img" />
      </motion.div>

      {/* 2-й блок — серый фон + текст */}
      <motion.div
        key={`${animationKey}-card`}
        className={`${styles.imgCard} ${styles.grayCard}`}
        variants={fadeRight}
        initial="hidden"
        animate="show"
      >
        <motion.div
          key={`${animationKey}-text`}
          className={`${styles.imgCenterText} ${styles.dark}`}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div className={styles.textBlock}>
            <div className={styles.firstLine}>
              <span>Hello, We’re </span>

              <img className={styles.tapedWord} src={tapedPng} alt="taped" />

              <span>— a studio</span>
            </div>

            <div className={styles.secondLine}>
              specializing in actor headshots, self-tape videos, and reels.
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* кнопки внизу справа */}
      <div className={styles.colActions}>
        <BookAShootButton targetId="book" />
        <ChatPill />
      </div>
    </div>
  );
};

export default ImagesListColumn;
