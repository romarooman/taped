import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Service.module.css";
import bg from "../../images/service.webp";
import usePageAnimation from "../PageSlider/hooks/usePageAnimation";
import { motion } from "framer-motion";
import { fadeLeft } from "../PageSlider/hooks/PageAnimations";

const Service = () => {
  const location = useLocation();
  const animationKey = usePageAnimation();

  const title =
    location.pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
    "";

  const items = [
    { big: "headshots", tag: "video" },
    { big: "video shooting", tag: "photo" },
  ];

  return (
    <section id="service" className={styles.hero}>
      <div className={styles.mobileTitle}>what we do</div>
      <div className={styles.imageWrap}>
        <img className={styles.bg} src={bg} alt="services background" />
      </div>

      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <div className={styles.top}>{title}</div>
          <motion.div
            key={`${animationKey}-image`}
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            className={styles.bottom}
          >
            {items.map((it, idx) => (
              <Link
                key={idx}
                to="headshots"
                className={styles.line}
                aria-label={`${it.big} ${it.tag}`}
              >
                <span className={styles.big}>{it.big}</span>
                <span className={styles.tag}>{it.tag}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Service;
