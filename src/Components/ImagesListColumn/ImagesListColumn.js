import React from "react";
import styles from "./ImagesListColumn.module.css";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";
import tapedPng from "../../images/taped_world.png"; // PNG со словом "taped"

const ImagesListColumn = ({ fimage }) => {
  return (
    <div className={styles.imagesCol}>
      {/* 1-й блок — картинка */}
      <div className="imgCard">
        <img className="img" src={fimage} alt="img" />
      </div>

      {/* 2-й блок — серый фон + текст */}
      <div className={`${styles.imgCard} ${styles.grayCard}`}>
        <div className={`${styles.imgCenterText} ${styles.dark}`}>
          <span>Hello, We’re </span>
          <img className={styles.tapedWord} src={tapedPng} alt="taped" />
          <span>
            — a studio specializing in actor headshots, self-tape videos, and
            reels.
          </span>
        </div>
      </div>

      {/* кнопки внизу справа */}
      <div className={styles.colActions}>
        <BookAShootButton targetId="book" />
        <ChatPill />
      </div>
    </div>
  );
};

export default ImagesListColumn;
