import React from "react";
import "./ImageHorizont.css";

const ImageHorizont = ({ fimage, simage }) => {
  console.log("fimage", fimage);

  return (
    <div className="image-container">
      <img className="image" src={fimage} alt="img" />
      <img className="image" src={simage} alt="img" />
    </div>
  );
};

export default ImageHorizont;
