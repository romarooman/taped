import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import styles from "./ExhibitionCard.module.css";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";

export default function ExhibitionCard({ items = [] }) {
  const { slug } = useParams();

  const item = items.find((el) => el.slug === slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  if (!item) {
    return <Navigate to="/community/grid" replace />;
  }

  const data = item.more || {};

  return (
    <section className={styles.wrapper}>
      <Breadcrumbs
        className={styles.breadcrumbs}
        items={[
          { label: "main", to: "/" },
          { label: "community", to: "/community" },
          { label: data.title || item.name },
        ]}
      />

      <h1 className={styles.mobileTitle}>{data.title || item.name}</h1>

      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={styles.title}>{data.title || item.name}</h1>

          <p className={styles.description}>
            {data.description || item.description}
          </p>

          <p className={styles.secondText}>{data.secondText}</p>

          <div className={styles.bottom}>
            <div className={styles.price}>{data.price}</div>

            <div className={styles.info}>
              <div className={styles.date}>{data.date}</div>

              <div className={styles.location}>
                {(data.location || "").split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <img
              src={item.image}
              alt={data.title || item.name}
              className={styles.image}
            />
          </div>

          <div className={styles.cta}>
            <div className={styles.visit}>visit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
