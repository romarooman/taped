import React from "react";
import styles from "./ServiceCard.module.css";
import ContactForm from "../ContactForm/ContactForm";

export default function ServiceCard({
  breadcrumbs = "main / services / headshots",
  title = "headshot studio session",
  description = `is an actor from barcelona, now based in new york. 
he brings an understanding of performance and how to make people feel comfortable in front of the camera.`,
  price = "60$",
  duration = "1 hour",
  image,
  onBook,
}) {
  const words = title.split(" ");

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* TOP */}
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.breadcrumbs}>{breadcrumbs}</div>

              <h1 className={styles.title}>
                {words.map((word, i) => (
                  <span key={i} className={styles.titleLine}>
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            <div className={styles.right}>
              <img src={image} alt={title} />
            </div>
          </div>

          {/* BOTTOM */}
          <div className={styles.bottom}>
            <div className={styles.infoBlock}>
              <div className={styles.label}>what is it?</div>
              <div className={styles.text}>{description}</div>
            </div>

            <div className={styles.metaBlock}>
              <div className={styles.metaItem}>
                <div className={styles.label}>what’s the price?</div>
                <div className={styles.value}>{price}</div>
              </div>

              <div className={styles.metaItem}>
                <div className={styles.label}>duration</div>
                <div className={styles.value}>{duration}</div>
              </div>
            </div>

            <button className={styles.bookBtn} onClick={onBook}>
              book
            </button>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
