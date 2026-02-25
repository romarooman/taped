import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Service.module.css";
import bg from "../../images/service.png";

const Service = () => {
  const location = useLocation();

  const title =
    location.pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
    "";

  const items = [
    { big: "headshots", tag: "video" },
    { big: "video shooting", tag: "photo" },
    { big: "acting", tag: "video" },
    { big: "other", tag: "photo" },
  ];

  return (
    <section id="service" className={styles.hero}>
      <div className={styles.imageWrap}>
        <img className={styles.bg} src={bg} alt="services background" />
      </div>

      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <div className={styles.top}>{title}</div>

          <div className={styles.bottom}>
            {items.map((it, idx) => (
              <Link
                key={idx}
                to="/service/card"
                className={styles.line}
                aria-label={`${it.big} ${it.tag}`}
              >
                <span className={styles.big}>{it.big}</span>
                <span className={styles.tag}>{it.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
