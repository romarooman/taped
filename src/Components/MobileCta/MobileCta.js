import React from "react";
import styles from "./MobileCta.module.css";

const MobileCta = ({ targetId = "book" }) => {
  const onClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button className={styles.mobileCta} onClick={onClick} type="button">
      book a shoot or let’s chat
    </button>
  );
};

export default MobileCta;
