import React, { useState } from "react";
import styles from "./VimeoTeaser.module.css";


export default function VimeoTeaser({
  preview,
  vimeoId = "76979871",
  title = "teaser:",
  description = `is an actor from barcelona, now based in new york. 
he brings an understanding of performance and how to make people 
feel comfortable in front of the camera.`,
}) {
  const [play, setPlay] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.label}>{title}</div>

      <div className={styles.teaser}>
        {!play ? (
          <>
            <img
              src={preview}
              alt="preview"
              className={styles.preview}
              loading="lazy"
              decoding="async"
            />

            <div className={styles.overlay}>
              <button
                className={styles.playButton}
                onClick={() => setPlay(true)}
              >
                play
              </button>

              <div className={styles.description}>{description}</div>
            </div>
          </>
        ) : (
          <iframe
            className={styles.video}
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo video"
          />
        )}
      </div>
    </section>
  );
}
