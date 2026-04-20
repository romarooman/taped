import React from "react";
import styles from "./MoskData.module.css";

export default function MoskData({ title = "Test Test" }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
    </section>
  );
}
