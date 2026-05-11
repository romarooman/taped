import React, { useEffect, useRef, useState } from "react";

import styles from "./ServiceCard.module.css";
import Location from "../Location/Location";
import locationImg from "../../images/building.png";
import mapImg from "../../images/map.png";
import TableIncluded from "./TableIncluded";
import VimeoTeaser from "./VimeoTeaser";
import One from "../../images/1.png";
import ContactForm from "../ContactForm/ContactForm";
import PhotoSlider from "../PhotoSlider/PhotoSlider";

import Two from "../../images/2.png";
import Three from "../../images/3.png";

import Five from "../../images/5.png";
import Six from "../../images/6.png";

const photos = [
  { id: 1, src: One, alt: "photo 1" },
  { id: 2, src: Two, alt: "photo 2" },
  { id: 3, src: Three, alt: "photo 3" },
  { id: 3, src: Five, alt: "photo 3" },
  { id: 3, src: Six, alt: "photo 3" },
];

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

  const bottomRef = useRef(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!bottomRef.current) return;

      const rect = bottomRef.current.getBoundingClientRect();

      setStuck(rect.top <= 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        </div>
      </section>
      {/* BOTTOM */}
      <div
        ref={bottomRef}
        className={`${styles.bottom} ${stuck ? styles.stickyActive : ""}`}
      >
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
      <PhotoSlider title="how it goes:" photos={photos} />
      <TableIncluded />
      <VimeoTeaser preview={One} />
      <ContactForm />
      <Location image={locationImg} mapImage={mapImg} />
    </>
  );
}
