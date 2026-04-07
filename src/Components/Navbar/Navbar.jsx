import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tapedImg from "../../images/logoT.png";
import "./Navbar.css";

const navItems = ["we are", "service", "community", "contacts"];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("we are");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handlePick = (item) => {
    setActiveItem(item);
    if (item === "we are") navigate("/");
    if (item === "service") navigate("/service");
    if (item === "community") navigate("/community");
    if (item === "contacts") navigate("/contacts");
  };

  return (
    <nav className="navbar">
      {/* Mobile row: taped слева + burger справа */}
      <div className="navbar-mobile">
        <img src={tapedImg} alt="taped" className="taped-label" />

        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
        >
          <span />

          <span />
        </button>
      </div>

      {/* Desktop menu */}
      <ul className="nav-list">
        {navItems.map((item) => {
          const isActive = activeItem === item;
          const isHovered = hoveredItem === item;

          return (
            <li
              key={item}
              className={`nav-item ${isActive ? "active" : ""}`}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handlePick(item)}
            >
              {item}
              {(isHovered || isActive) && (
                <img src={tapedImg} alt="taped" className="taped" />
              )}
            </li>
          );
        })}
      </ul>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => {
          const isActive = activeItem === item;
          return (
            <button
              key={item}
              className={`mobile-item ${isActive ? "active" : ""}`}
              onClick={() => handlePick(item)}
              type="button"
            >
              {item}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
