import React from "react";
import styles from "./Location.module.css";

export default function Location({
  title = "we are here:",
  image,
  mapImage,

  facebook = "pizzasushi_ny",
  x = "pizzasushi.ny",
  instagram = "@pizzasushi.ny",

  street = "mercer st",
  city = "new york, ny 10012",

  email = "pizzasushi@gmail.com",
  copyright = "©2025, taped.",
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <img src={image} alt="location" />
        </div>

        <div className={styles.mapWrap}>
          <img src={mapImage} alt="map" />
          <div className={styles.dot} />
        </div>
      </div>

      {/* DESKTOP bottom info */}
      <div className={styles.desktopInfo}>
        <div className={styles.infoGrid}>
          {/* row 1 */}
          <div className={styles.labels}>
            <div>facebook:</div>
            <div>x:</div>
            <div>instagram:</div>
          </div>

          <div className={styles.values}>
            <div>{facebook}</div>
            <div>{x}</div>
            <div>{instagram}</div>
          </div>

          <div className={styles.addrLabel}>adress:</div>

          <div className={styles.addrValue}>
            <div>{street}</div>
            <div>{city}</div>
          </div>

          {/* row 2 */}
          <div className={styles.emailLabel}>email:</div>
          <div className={styles.emailValue}>{email}</div>

          <div />
          <div className={styles.copy}>{copyright}</div>
        </div>
      </div>

      {/* MOBILE info (как было) */}
      <div className={styles.mobileInfo}>
        <div className={styles.social}>
          <div>
            pizzasushi_ny <br />
            {instagram}
          </div>
        </div>

        <div className={styles.address}>
          <p>{street}</p>
          <p>{city}</p>
        </div>

        <div className={styles.email}>{email}</div>
        <div className={styles.copy}>{copyright}</div>
      </div>
    </section>
  );
}
