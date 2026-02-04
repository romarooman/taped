import React from "react";
import styles from "./ImagesOnly.module.css";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";
import MobileCta from "../MobileCta/MobileCta";

const ImagesOnly = ({ one, brands }) => {
  return (
    <>
      <div className={styles.mobileCtaWrap}>
        <MobileCta targetId="book" />
      </div>
      <img className={`${styles.heroBg}`} src={one} alt="" />

      <div className={`${styles.heroText}`}>
        <div className={`${styles.heroTitle}`}>
          full-service studio
          <br />
          for actors, creatives & professionals
        </div>

        <div className={`${styles.heroRowBottom}`}>
          <img className={`${styles.heroBadge}`} src={brands} alt="" />
        </div>
      </div>

      <div className={`${styles.heroActionsFixed}`}>
        <BookAShootButton targetId="book" />
        <ChatPill />
      </div>
    </>
  );
};

export default ImagesOnly;
