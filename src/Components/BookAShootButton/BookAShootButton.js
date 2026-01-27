import React from "react";
import "./BookAShootButton.css";

const BookAShootButton = ({ targetId = "book" }) => {
  const onClick = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button className="pillBtn" type="button" onClick={onClick}>
      book a shoot.
    </button>
  );
};

export default BookAShootButton;
