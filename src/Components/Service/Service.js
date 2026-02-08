import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Service.module.css";
import bg from "../../images/service.png";

const Service = () => {
  const location = useLocation();

  // берём последний сегмент пути
  const title =
    location.pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
    "";

  return (
    <section id="service" className={styles.hero}>
      <div className={styles.imageWrap}>
        <img className={styles.bg} src={bg} alt="services background" />
      </div>

      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <div className={styles.top}>{title}</div>

          <Link to="/service" className={styles.bottom}>
            <div className={styles.line}>
              <span className={styles.big}>headshots</span>
              <span className={styles.tag}>video</span>
            </div>
            <div className={styles.line}>
              <span className={styles.big}>video shooting</span>
              <span className={styles.tag}>photo</span>
            </div>
            <div className={styles.line}>
              <span className={styles.big}>acting</span>
              <span className={styles.tag}>video</span>
            </div>
            <div className={styles.line}>
              <span className={styles.big}>other</span>
              <span className={styles.tag}>photo</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Service;
