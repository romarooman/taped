import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import locationImg from "../../../images/building.webp";
import mapImg from "../../../images/map.webp";
import One from "../../../images/1.webp";

import ContactForm from "../../ContactForm/ContactForm";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import VimeoTeaser from "../../ServiceCard/VimeoTeaser";
import Location from "../../Location/Location";
import ExpertsHorizontalSlider from "./ExpertsHorizontalSlider";
import styles from "./ExpertsMore.module.css";

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
    return <Navigate to="/experts/more" replace />;
  }

  return (
    <>
      <div className={styles.sliderSection}>
        <Breadcrumbs
          className={styles.breadcrumbs}
          items={[
            { label: "main", to: "/" },
            { label: "experts", to: "/experts" },
            { label: "more", to: "/experts/more" },
            { label: expert.name },
          ]}
        />

        <ExpertsHorizontalSlider sections={expert.sections} />
      </div>

      <VimeoTeaser
        title="watch a video version:"
        preview={expert.image || One}
      />

      <ContactForm />

      <Location image={locationImg} mapImage={mapImg} />
    </>
  );
}
