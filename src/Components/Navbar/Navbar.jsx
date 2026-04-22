import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tapedImg from "../../images/logoT.png";
import "./Navbar.css";

const navItems = ["we are", "service", "community", "contacts"];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("we are");
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
      {/* Mobile */}
      <div className="navbar-mobile">
        <img src={tapedImg} alt="taped" className="taped-label" />

        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Desktop */}
      <ul className="nav-list">
        {navItems.map((item) => {
          const isActive = activeItem === item;

          return (
            <li
              key={item}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handlePick(item)}
            >
              {item}

              {/* ✅ taped ТОЛЬКО у "we are" */}
              {item === "we are" && (
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
