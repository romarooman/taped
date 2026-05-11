import React from "react";
import styles from "./Included.module.css";

export default function TableIncluded({
  title = "what’s included?",
  items = [
    "we discuss your goals and choose the best approach",
    "up to 2–4 outfit changes",
    "reference selection support",
    "background matched to your type and looks",
    "full gallery access (500+ photos)",
    "professional retouching and color grading of 5 selected images",
  ],
  activeIndex = 1,
}) {
  return (
    <section className={styles.included}>
      <div className={styles.title}>{title}</div>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              index === activeIndex ? styles.active : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}