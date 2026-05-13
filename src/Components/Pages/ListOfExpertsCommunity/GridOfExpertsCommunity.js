import React from "react";
import styles from "./GridOfExpertsCommunity.module.css";

export default function GridOfExpertsCommunity({
  title = "experts",
  items = [],
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.breadcrumbs}>main / experts</div>

      <h2 className={styles.title}>{title}</h2>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.name} className={styles.image} />

              {item.label && (
                <div
                  className={`${styles.label} ${
                    item.label === "past" ? styles.labelPast : ""
                  }`}
                >
                  {item.label}
                </div>
              )}
            </div>

            <div className={styles.content}>
              <h3 className={styles.name}>{item.name}</h3>

              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
        {/* <button className={styles.button}>book a shoot.</button> */}
      </div>
    </section>
  );
}
