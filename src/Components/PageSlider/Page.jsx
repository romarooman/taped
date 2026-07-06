import React from "react";

export default function Page({ children, direction = "vertical", id }) {
  return (
    <section data-page-id={id} data-direction={direction}>
      {children}
    </section>
  );
}
