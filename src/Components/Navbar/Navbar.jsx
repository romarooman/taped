import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import navigation from "../../navigation";
import tapedImg from "../../images/logoT.png";

import { usePageSlider } from "../PageSlider/PageSliderContext";

import "./Navbar.css";

export default function Navbar() {
  const { state, goTo } = usePageSlider();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePick = (item) => {
    goTo(
      item.pageIndex,
      typeof item.horizontalIndex === "number" ? item.horizontalIndex : 0,
    );

    navigate(item.path);

    setMenuOpen(false);
  };

  const isItemActive = (item) => {
    if (state.pageIndex !== item.pageIndex) {
      return false;
    }

    if (typeof item.horizontalIndex === "number") {
      return state.horizontalIndex === item.horizontalIndex;
    }

    return true;
  };

  return (
    <nav className="navbar">
      <div className="navbar-mobile">
        <img src={tapedImg} alt="taped" className="taped-label" />

        <button
          type="button"
          className={`burger ${menuOpen ? "open" : ""}`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <ul className="nav-list">
        {navigation.map((item) => {
          const isActive = isItemActive(item);

          return (
            <li
              key={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handlePick(item)}
            >
              {item.title}

              {isActive && <img src={tapedImg} alt="taped" className="taped" />}
            </li>
          );
        })}
      </ul>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navigation.map((item) => {
          const isActive = isItemActive(item);

          return (
            <button
              key={item.path}
              type="button"
              className={`mobile-item ${isActive ? "active" : ""}`}
              onClick={() => handlePick(item)}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
