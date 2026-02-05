import React, { useMemo, useState } from "react";
import Three from "../../images/3.png";
import styles from "./GiftCard.module.css";
import Arrow_list from "../../images/arrow_list.png";

export default function GiftCard() {
  const [tab, setTab] = useState("option1");

  const data = useMemo(
    () => ({
      option1: {
        title: "headshots",
        price: "570$",
        bullets: [
          "We discuss your goals and choose the best approach",
          "you will have Up to 2–4 outfit changes",
          "Reference selection support",
          "Background matched to your type and looks",
          "Full gallery access (500+ photos)",
          "Full gallery access (500+ photos)",
        ],
      },
      option2: {
        title: "headshots",
        price: "670$",
        bullets: [
          "We discuss your goals and choose the best approach",
          "you will have Up to 2–4 outfit changes",
          "Reference selection support",
          "Background matched to your type and looks",
          "Full gallery access (500+ photos)",
          "Full gallery access (500+ photos)",
        ],
      },
    }),
    [],
  );

  const active = data[tab];

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        {/* LEFT */}
        <section className={styles.left}>
          <div className={styles.tabs}>
            <button
              type="button"
              onClick={() => setTab("option1")}
              className={`${styles.tabBtn} ${
                tab === "option1" ? styles.tabActive : styles.tabInactive
              }`}
            >
              option 1
            </button>

            <button
              type="button"
              onClick={() => setTab("option2")}
              className={`${styles.tabBtn} ${
                tab === "option2" ? styles.tabActive : styles.tabInactive
              }`}
            >
              option 2
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.headerRow}>
              <h2 className={styles.title}>{active.title}</h2>
              <div className={styles.price}>{active.price}</div>
            </div>

            <div className={styles.divider} />

            <ul className={styles.list}>
              {active.bullets.map((t, i) => (
                <li key={i} className={styles.listItem}>
                  <img src={Arrow_list} alt="" className={styles.bulletIcon} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RIGHT */}
        <section className={styles.right}>
          <div className={styles.imageBox}>
            <img src={Three} alt="Preview" className={styles.image} />
          </div>

          <button type="button" className={styles.buyBtn}>
            buy
          </button>
        </section>
      </div>
    </div>
  );
}
