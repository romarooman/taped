import { studioImages } from "../../data/studioData";
import Image from "../Image/Image";
import React, { useEffect, useRef, useState } from "react";

import styles from "./ServiceCard.module.css";
import Location from "../Location/Location";
import TableIncluded from "./TableIncluded";
import VimeoTeaser from "./VimeoTeaser";
import ContactForm from "../ContactForm/ContactForm";
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

import { headshotsService } from "../../data/servicesData";

const defaultBreadcrumbs = [
  { label: "main", to: "/" },
  { label: "services", to: "/service" },
  { label: "headshots" },
];

export default function ServiceCard({
  breadcrumbs = defaultBreadcrumbs,
  image = headshotsService.image,
  onBook,
}) {
  const bottomRef = useRef(null);

  const [stuck, setStuck] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedId, setSelectedId] = useState("session");

  const selectedService =
    headshotsService.options.find((item) => item.id === selectedId) || headshotsService.options[0];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
              <Breadcrumbs
                className={styles.breadcrumbs}
                items={breadcrumbs}
              />

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
                    {headshotsService.options.map((item) => (
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
              <Image src={image} alt={selectedService.title} />
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

      <PhotoSlider title="how it goes:" photos={headshotsService.photos} />

      <TableIncluded />

      <VimeoTeaser preview={headshotsService.preview} />

      <ContactForm />

      <Location {...studioImages} />
    </>
  );
}
