import React, { useMemo, useState } from "react";
import styles from "./PhotoSlider.module.css";

const PhotoSlider = ({ title = "how it goes:", photos = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const touchStartX = React.useRef(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, photos.length - visibleCount);

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex >= maxIndex;

  const handlePrev = () => {
    if (isPrevDisabled) return;
    setStartIndex((prev) => prev - 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0 && !isNextDisabled) {
      handleNext();
    }

    if (diff < 0 && !isPrevDisabled) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (isNextDisabled) return;
    setStartIndex((prev) => prev + 1);
  };

  const extendedPhotos = useMemo(() => {
    return photos.map((photo, index) => ({
      ...photo,
      innerId: photo.id || `${photo.src}-${index}`,
    }));
  }, [photos]);

  if (!photos.length) return null;

  return (
    <section className={styles.slider}>
      <div className={styles.top}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.controls}>
          <button
            className={`${styles.arrow} ${isPrevDisabled ? styles.disabled : ""}`}
            onClick={handlePrev}
            disabled={isPrevDisabled}
            aria-label="Previous"
          >
            ←
          </button>

          <button
            className={`${styles.arrow} ${isNextDisabled ? styles.disabled : ""}`}
            onClick={handleNext}
            disabled={isNextDisabled}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
          }}
        >
          {extendedPhotos.map((photo) => (
            <div className={styles.slide} key={photo.innerId}>
              <div className={styles.card}>
                <img
                  src={photo.src}
                  alt={photo.alt || "photo"}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoSlider;
