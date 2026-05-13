import React from "react";
import styles from "./ExhibitionCard.module.css";

export default function ExhibitionCard({
  breadcrumbs = "main / community",
  title = "anton volodin exibition",
  description = `our studio is placed in a beautiful
historical district in ny. we discuss your goals
and choose the best approach. up to 2–4
outfit changes. reference selection support.
background matched to your type and looks.
full gallery access (500+ photos).`,
  secondText = `up to 2–4 outfit changes. reference selection
support. background matched to your type
and looks. full gallery access (500+ photos).`,
  price = "$30",
  date = "starts on august 29th",
  location = `mercer st
new york, ny 10012`,
  image,
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.breadcrumbs}>{breadcrumbs}</div>

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{description}</p>

        <p className={styles.secondText}>{secondText}</p>

        <div className={styles.bottom}>
          <div className={styles.price}>{price}</div>

          <div className={styles.info}>
            <div className={styles.date}>{date}</div>

            <div className={styles.location}>
              {location.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.imageWrap}>
          <img src={image} alt={title} className={styles.image} />
        </div>

        <div className={styles.cta}>
          <div className={styles.visit}>visit</div>
        </div>
      </div>
    </section>
  );
}
