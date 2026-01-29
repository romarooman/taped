import React, { useEffect, useRef, useState } from "react";
import "./horizontalscroll.css";
import One from "../../images/1.png";
import Two from "../../images/2.png";
import Three from "../../images/3.png";
import Four from "../../images/4.png";
import Five from "../../images/5.png";
import Six from "../../images/6.png";

import brands from "../../images/brands.png";

import { motion, useScroll, useTransform } from "framer-motion";
import ImagesListRow from "../ImagesListRow/ImagesListRow";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";
import ImagesListColumn from "../ImagesListColumn/ImagesListColumn";

const slidesCount = 6;

const HorizontalScroll = () => {
  const targetRef = useRef(null);
  const [vw, setVw] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // сдвиг = (кол-во слайдов - 1) * ширина окна
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -((slidesCount - 1) * vw)],
  );

  return (
    <section className="carousel" ref={targetRef}>
      <div className="sticky">
        <motion.div className="track" style={{ x }}>
          <div className="slide" key={11}>
            <div className="image-wrapper hero">
              <img className="hero-bg" src={One} alt="" />

              <div className="hero-text">
                <div className="hero-title">
                  full-service studio
                  <br />
                  for actors, creatives & professionals
                </div>

                <div className="hero-row-bottom">
                  <img className="hero-badge" src={brands} alt="" />
                </div>
              </div>

              <div className="hero-actions-fixed">
                <BookAShootButton targetId="book" />
                <ChatPill />
              </div>
            </div>
          </div>
          <div className="slide" key={10}>
            <div className="image-wrapper">
              <ImagesListColumn fimage={Two} />
            </div>
          </div>

          <div className="slide" key={12}>
            <div className="image-wrapper">
              <ImagesListRow
                subtitle="our mission is to build
a one-stop service
that covers every aspect
of an actor’s visual
presentationand
personal branding"
                bg="#DAFF3E"
                textOn="second"
                fimage={Three}
              />
            </div>
          </div>
          <div className="slide" key={13}>
            <div className="image-wrapper">
              <ImagesListRow
                subtitle="We aim to support
talent by creating
tools and content that
are both useful
and beautifully crafted."
                textOn="first"
                fimage={Four}
                bg="#DAFF3E"
                order="bg-first"
              />
            </div>
          </div>

          <div className="slide" key={13}>
            <div className="image-wrapper">
              <ImagesListRow
                textOn="first"
                fimage={Five}
                bg="#FFFFFF"
                order="bg-first"
                title="Max Ishchenko"
                subtitle="is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work."
                subtitleSize="clamp(4px, 3.5vw, 20px)"
              />
            </div>
          </div>

          <div className="slide" key={13}>
            <div className="image-wrapper">
              <ImagesListRow
                title="Mateu Parellada"
                subtitle="is an actor from Barcelona, now
based in New York. He brings an understanding of performance and how to make people feel comfortable
in front of the camera."
                subtitleSize="clamp(4px, 3.5vw, 20px)"
                textOn="first"
                fimage={Six}
                bg="#FFFFFF"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
