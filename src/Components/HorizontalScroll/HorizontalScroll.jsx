import React, { useRef } from "react";
import "./horizontalscroll.css";
import One from "../../images/1.png";
import Three from "../../images/3.png";
import Two from "../../images/4.png";
import Four from "../../images/green.png";
import { motion, useScroll, useTransform } from "framer-motion";
import ImagecontainerHorizont from "../ImageHorizont/ImageHorizont";

const HorizontalScroll = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(3 - 1) * 100}%`],
  );

  return (
    <section className="carousel" ref={targetRef}>
      <div className="sticky">
        <motion.div className="track" style={{ x }}>
          <div className="slide" key={11}>
            <div className="image-wrapper">
              <img src={One} alt="" />
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
