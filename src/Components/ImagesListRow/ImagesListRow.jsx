import React from "react";
import "./ImagesListRow.css";
import ChatPill from "../ChatPill/ChatPill";
import BookAShootButton from "../BookAShootButton/BookAShootButton";

const ImagesListRow = ({
  fimage,
  bg = "#CCCCCC",
  title,
  subtitle,
  order = "image-first",
  subtitleSize = "clamp(24px, 3.5vw, 24px)",
}) => {
  const isImageFirst = order === "image-first";

  const TextBlock = (
    <div className="imgCenterText">
      {title && <div className="titleText">{title}</div>}
      {subtitle && (
        <div style={{ fontSize: subtitleSize }} className="subtitleText">
          {subtitle}
        </div>
      )}
    </div>
  );

  return (
    <div className="imagesRow">
      {isImageFirst ? (
        <>
          {/* картинка */}
          <div className="imgCard">
            <img className="img" src={fimage} alt="img" />
          </div>

          {/* background */}
          <div className="imgCard bgCard" style={{ background: bg }}>
            {TextBlock}
          </div>
        </>
      ) : (
        <>
          {/* background */}
          <div className="imgCard bgCard" style={{ background: bg }}>
            {TextBlock}
          </div>

          {/* картинка */}
          <div className="imgCard">
            <img className="img" src={fimage} alt="img" />
          </div>
        </>
      )}

      {/* кнопки всегда внизу справа */}
      <div className="rowActions">
        <BookAShootButton targetId="book" />
        <ChatPill />
      </div>
    </div>
  );
};

export default ImagesListRow;
