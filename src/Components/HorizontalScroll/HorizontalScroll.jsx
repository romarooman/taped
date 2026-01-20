import React, { useRef } from "react";
import "./horizontalscroll.css";
import One from "../../images/item 01.png";
import Two from "../../images/Mask group.png";
import Thhree from "../../images/Rectangle 68.png";
import Four from "../../images/Mask group2.png";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageContainer from "../ImageContainer/ImageContainer";

const HorizontalScroll = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <div className="carousel" ref={targetRef}>
      <div className="contentContainer">
        <motion.div className="images" style={{ x }}>
       <div className="imageItem fullscreen">
            <ImageContainer imageSource={One} description={"june"} />
          </div>

          <div className="imageItem">
            <ImageContainer imageSource={Two} description={"june2"} />
            <ImageContainer imageSource={Thhree} description={"june3"} />
          </div>
          <div className="imageItem">
            <ImageContainer imageSource={Four} description={"june2"} />
            <ImageContainer imageSource={Thhree} description={"june3"} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
