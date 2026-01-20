import React from "react";
import { useState } from "react";
import "./Navbar.css";

const navItems = ["We are", "Service", "Community", "Contacts"];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <nav className="navbar">
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
              onClick={() => setActiveItem(item)}
            >
              {item}

              {(isHovered || isActive) && <span className="taped">taped.</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
