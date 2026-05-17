import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import styles from "./ExpertsMore.module.css";

import locationImg from "../../../images/building.png";
import mapImg from "../../../images/map.png";
import One from "../../../images/1.png";

import ContactForm from "../../ContactForm/ContactForm";
import VimeoTeaser from "../../ServiceCard/VimeoTeaser";
import Location from "../../Location/Location";
import ImagesListRow from "../../ImagesListRow/ImagesListRow";

export default function ExpertsMore({ items = [] }) {
  const { slug } = useParams();

  const expert = items.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  if (!expert) {
    return <Navigate to="/experts/grid" replace />;
  }

  return (
    <>
      {expert.sections.map((section, index) => (
        <div className={styles.imageWrapper} key={index}>
          <ImagesListRow
            textOn="first"
            fimage={section.image}
            padding={0}
            bg="#FFFFFF"
            order="bg-first"
            title={section.title}
            subtitle={section.subtitle}
            subtitleSize="clamp(4px, 3.5vw, 20px)"
          />
        </div>
      ))}

      <VimeoTeaser
        title="watch a video version:"
        preview={expert.image || One}
      />

      <ContactForm />

      <Location image={locationImg} mapImage={mapImg} />
    </>
  );
}
