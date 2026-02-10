import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExpertCommunity.module.css";

const ExpertCommunity = ({
  fimage,
  order = "text-first",
  kicker = "community",
  title = (
    <>
      yes, we have <br />
      a community
    </>
  ),
  desc = `is a director from moscow who based in new york. he works in narrative
film and photography and brings a calm, focused eye to the work.`,
  moreText = "more ↗",
  moreTo = "/community",
  bg = "#FFFFFF",
}) => {
  const isImageFirst = order === "image-first";

  const TextCard = (
    <div className={`${styles.card} ${styles.textCard}`} style={{ background: bg }}>
      <div className={styles.textTop}>
        {!!kicker && <div className={styles.kicker}>{kicker}</div>}

        {!!title && <h1 className={styles.title}>{title}</h1>}

        {!!desc && <p className={styles.desc}>{desc}</p>}

        <div className={styles.mobileImageWrap}>
          <img className={styles.mobileImg} src={fimage} alt="community" />
        </div>
      </div>

      <Link to={moreTo} className={styles.more}>
        {moreText}
      </Link>
    </div>
  );

  const ImageCard = (
    <div className={`${styles.card} ${styles.imageCard}`}>
      <img className={styles.img} src={fimage} alt="community" />
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={styles.row}>
        {isImageFirst ? (
          <>
            {ImageCard}
            {TextCard}
          </>
        ) : (
          <>
            {TextCard}
            {ImageCard}
          </>
        )}
      </div>
    </section>
  );
};

export default ExpertCommunity;
