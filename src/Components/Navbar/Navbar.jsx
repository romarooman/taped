import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const navItems = ["We are", "Service", "Community", "Contacts"];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("We are");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const tapedText = " taped.";

  const handlePick = (item) => {
    if (item === "We are") navigate("/");
    if (item === "Service") navigate("/service");
    if (item === "Community") navigate("/community");
  };

  return (
    <nav className="navbar">
      {/* Mobile row: taped слева + burger справа */}
      <div className="navbar-mobile">
        <span className="taped-label">{tapedText}</span>

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
              {(isHovered || isActive) && <span className="taped">taped.</span>}
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
