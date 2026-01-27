import React, { useEffect, useRef, useState } from "react";
import "./horizontalscroll.css";
import One from "../../images/1.png";
import Three from "../../images/3.png";
import Two from "../../images/4.png";
import Four from "../../images/green.png";
import brands from "../../images/brands.png";

import { motion, useScroll, useTransform } from "framer-motion";
import ImagecontainerHorizont from "../ImageHorizont/ImageHorizont";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";

const slidesCount = 3;

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
                  <div className="hero-actions">
                    <BookAShootButton targetId="book" />
                    <ChatPill />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="slide" key={12}>
            <div className="image-wrapper">
              <ImagecontainerHorizont fimage={Three} simage={Four} />
            </div>
          </div>
          <div className="slide" key={13}>
            <div className="image-wrapper">
              <ImagecontainerHorizont fimage={Four} simage={Two} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
