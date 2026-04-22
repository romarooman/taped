import React from "react";
import styles from "./ImagesListRow.module.css";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";
import MobileCta from "../MobileCta/MobileCta";

const ImagesListRow = ({
  fimage,
  bg = "#CCCCCC",
  title,
  subtitle,
  order = "image-first",
  subtitleSize = "clamp(24px, 3.5vw, 24px)",
}) => {
  const isImageFirst = order === "image-first";

  const TextBlock = (
    <div className={styles.imgCenterText}>
      {title && <div className={styles.titleText}>{title}</div>}
      {subtitle && (
        <div style={{ fontSize: subtitleSize }} className={styles.subtitleText}>
          {subtitle}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.imagesRow}>
      <div className={styles.mobileCtaWrap}>
        <MobileCta targetId="book" />
      </div>

      {isImageFirst ? (
        <>
          <div className={styles.imgCard}>
            <img className={styles.img} src={fimage} alt="img" />
          </div>

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
            style={{ background: bg }}
          >
            {TextBlock}
          </div>

          <div className={styles.imgCard}>
            <img className={styles.img} src={fimage} alt="img" />
          </div>
        </>
      )}

      <div className={styles.rowActions}>
        <BookAShootButton targetId="book" />
        <ChatPill />
      </div>
    </div>
  );
};

export default ImagesListRow;
