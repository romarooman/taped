import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items = [], className = "" }) {
  return (
    <nav
      className={[styles.breadcrumbs, className].filter(Boolean).join(" ")}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && (
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
          )}

          {item.to ? (
            <Link className={styles.link} to={item.to}>
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
