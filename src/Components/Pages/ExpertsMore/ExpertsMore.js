import { studioImages } from "../../../data/studioData";
import { imagePlaceholders } from "../../../data/imagePlaceholders";
import React, { useLayoutEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import ContactForm from "../../ContactForm/ContactForm";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import VimeoTeaser from "../../ServiceCard/VimeoTeaser";
import Location from "../../Location/Location";
import ExpertsHorizontalSlider from "./ExpertsHorizontalSlider";
import styles from "./ExpertsMore.module.css";

export default function ExpertsMore({ items = [] }) {
  const { slug } = useParams();

  const expert = items.find((item) => item.slug === slug);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
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

        <ExpertsHorizontalSlider key={slug} sections={expert.sections} />
      </div>

      <VimeoTeaser
        title="watch a video version:"
        preview={expert.image || imagePlaceholders.hero}
      />

      <ContactForm />

      <Location {...studioImages} />
    </>
  );
}
