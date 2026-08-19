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
  { id: 4, src: Five, alt: "photo 5" },
  { id: 5, src: Six, alt: "photo 6" },
  { id: 6, src: Two, alt: "photo 2" },
  { id: 7, src: Six, alt: "photo 3" },
];

const serviceOptions = [
  {
    id: "quick-shot",
    label: "quick shot",
    title: ["headshot", "quick", "shot"],
    description:
      "short and focused headshot session for getting a strong result quickly.",
    price: "200$",
    duration: "30 min",
  },
  {
    id: "session",
    label: "the session",
    title: ["headshot", "studio", "session"],
    description:
      "a full headshot studio session with enough time for different looks and setups.",
    price: "340$",
    duration: "1 hour",
  },
  {
    id: "half-day",
    label: "half day",
    title: ["headshot", "half", "day"],
    description:
      "an extended session with more time for different looks, setups and creative directions.",
    price: "1000$",
    duration: "4 hours",
  },
  {
    id: "all-in",
    label: "all in",
    title: ["headshot", "all", "in"],
    description:
      "a complete package with maximum shooting time and flexibility for different types of content.",
    price: "1500$",
    duration: "full day",
  },
];

export default function ServiceCard({
  breadcrumbs = "main / services / headshots",
  image,
  onBook,
}) {
  const bottomRef = useRef(null);

  const [stuck, setStuck] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedId, setSelectedId] = useState("session");

  const selectedService =
    serviceOptions.find((item) => item.id === selectedId) || serviceOptions[0];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  console.log(bottomRef);

  useEffect(() => {
    const handleScroll = () => {
      if (!bottomRef.current) return;

      const rect = bottomRef.current.getBoundingClientRect();

      setStuck(rect.top <= 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    setDropdownOpen(false);
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.breadcrumbs}>{breadcrumbs}</div>

              <div className={styles.optionsWrap}>
                <button
                  type="button"
                  className={styles.optionsButton}
                  onClick={() => setDropdownOpen((value) => !value)}
                >
                  <span>headshot options</span>

                  <span
                    className={`${styles.optionsArrow} ${
                      dropdownOpen ? styles.optionsArrowOpen : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className={styles.optionsMenu}>
                    {serviceOptions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.optionItem} ${
                          selectedId === item.id ? styles.optionItemActive : ""
                        }`}
                        onClick={() => handleSelect(item.id)}
                      >
                        <span>{item.label}</span>
                        <span>{item.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <h1 className={styles.title}>
                {selectedService.title.map((line, index) => (
                  <span key={index} className={styles.titleLine}>
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <div className={styles.right}>
              <img src={image} alt={selectedService.title} />
            </div>
          </div>
        </div>
      </section>

      <div
        ref={bottomRef}
        className={`${styles.bottom} ${stuck ? styles.stickyActive : ""}`}
      >
        <div className={styles.infoBlock}>
          <div className={styles.label}>what is it?</div>

          <div className={styles.text}>{selectedService.description}</div>
        </div>

        <div className={styles.metaBlock}>
          <div className={styles.metaItem}>
            <div className={styles.label}>what’s the price?</div>

            <div className={styles.value}>{selectedService.price}</div>
          </div>
        </div>

        <div className={styles.metaBlock}>
          <div className={styles.metaItem}>
            <div className={styles.label}>duration</div>

            <div className={styles.value}>{selectedService.duration}</div>
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
