import React, { useEffect, useRef, useState } from "react";
import "./ChatPill.css";
import sendIcon from "../../images/arrow.png";
import ChatSvg from "../../images/cloud.svg";

const ChatPill = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (open && wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const send = () => {
    if (!msg.trim()) return;
    console.log("chat message:", msg);
    setMsg("");
  };

  return (
    <div className="chatWrap" ref={wrapRef}>
      {/* PNG-кнопка всегда в потоке */}
      <button
        className={`chatSvgBtn ${open ? "hidden" : ""}`}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <img className="chatSvgBg" src={ChatSvg} alt="" />
        <span className="chatSvgLabel">or let’s chat.</span>
      </button>

      {/* popup поверх PNG */}
      {open && (
        <div className="chatPopup">
          <div className="chatTitle">how can we help you?</div>
          <div className="chatDivider" />

          <div className="chatInputRow">
            <textarea
              ref={inputRef}
              className="chatInput"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Write a message…"
              rows={2}
            />

            <button className="chatSendIcon" type="button" onClick={send}>
              <img src={sendIcon} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPill;
