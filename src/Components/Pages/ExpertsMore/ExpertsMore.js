import React, { useEffect } from "react";

import styles from "./ExpertsMore.module.css";

import locationImg from "../../../images/building.png";
import mapImg from "../../../images/map.png";

import One from "../../../images/1.png";
import ContactForm from "../../ContactForm/ContactForm";

import Five from "../../../images/5.png";

import VimeoTeaser from "../../ServiceCard/VimeoTeaser";
import Location from "../../Location/Location";
import ImagesListRow from "../../ImagesListRow/ImagesListRow";

export default function ExpertsMore() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className={`${styles.imageWrapper}`}>
        <ImagesListRow
          textOn="first"
          fimage={Five}
          padding={0}
          bg="#FFFFFF"
          order="bg-first"
          title="Max Ishchenko"
          subtitle="is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work."
          subtitleSize="clamp(4px, 3.5vw, 20px)"
        />{" "}
      </div>
      <div className={`${styles.imageWrapper}`}>
        <ImagesListRow
          textOn="first"
          fimage={Five}
          padding={0}
          bg="#FFFFFF"
          order="bg-first"
          title="What’s your goal?"
          subtitle="is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work."
          subtitleSize="clamp(4px, 3.5vw, 20px)"
        />{" "}
      </div>
      <div className={`${styles.imageWrapper}`}>
        <ImagesListRow
          textOn="first"
          fimage={Five}
          padding={0}
          bg="#FFFFFF"
          order="bg-first"
          title="What music do you usually listen to?"
          subtitle="is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work."
          subtitleSize="clamp(4px, 3.5vw, 20px)"
        />
      </div>
      <VimeoTeaser title={"watch a video version:"} preview={One} />
      <ContactForm />
      <Location image={locationImg} mapImage={mapImg} />
    </>
  );
}
