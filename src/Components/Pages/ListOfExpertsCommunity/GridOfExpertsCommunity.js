import React from "react";
import { Link } from "react-router-dom";
import styles from "./GridOfExpertsCommunity.module.css";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";

export default function GridOfExpertsCommunity({
  title = "experts",
  items = [],
  basePath = "/experts",
}) {
  return (
    <section className={styles.wrapper}>
      <Breadcrumbs
        className={styles.breadcrumbs}
        items={[
          { label: "main", to: "/" },
          { label: title, to: basePath },
          { label: "more" },
        ]}
      />

      <h2 className={styles.title}>{title}</h2>

      <div className={styles.grid}>
        {items.map((item) => (
          <Link
            to={`${basePath}/${item.slug}`}
            className={styles.card}
            key={item.id}
          >
            <div className={styles.imageWrap}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
                loading="lazy"
                decoding="async"
              />

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
          </Link>
        ))}
      </div>
    </section>
  );
}
