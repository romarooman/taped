import React, { useState, useRef, useEffect } from "react";
import styles from "./QA.module.css";

export default function QA({ items = defaultItems, height = 420 }) {
  const [openIndex, setOpenIndex] = useState(-1);
  const listRef = useRef(null);

  // опционально: при открытии — немного подскроллить, чтобы пункт был виден
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector(`[data-qa-item="${openIndex}"]`);
    if (!el) return;

    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;

    if (elTop < viewTop) list.scrollTo({ top: elTop - 12, behavior: "smooth" });
    else if (elBottom > viewBottom)
      list.scrollTo({
        top: elBottom - list.clientHeight + 12,
        behavior: "smooth",
      });
  }, [openIndex]);

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>q&amp; a</h2>

      {/* ✅ новая обертка */}
      <div className={styles.scrollShell}>
        <div
          ref={listRef}
          className={styles.list}
          style={{
            maxHeight: typeof height === "number" ? `${height}px` : height,
          }}
        >
          {items.map((it, idx) => {
            const open = idx === openIndex;
            const isFirst = idx === 0;
            return (
              <div
                key={it.id ?? idx}
                data-qa-item={idx}
                className={[
                  styles.item,
                  isFirst ? styles.first : "",
                  open ? styles.open : "",
                ].join(" ")}
              >
                <button
                  type="button"
                  className={styles.head}
                  onClick={() => setOpenIndex(open ? -1 : idx)}
                  aria-expanded={open}
                >
                  <div className={styles.centerText}>
                    <div className={styles.q}>{it.q}</div>
                    <div className={styles.a}>{it.a}</div>
                  </div>

                  <span
                    className={`${styles.chev} ${open ? styles.chevUp : ""}`}
                  />
                </button>

                <div className={styles.panel}>
                  {open && (
                    <div className={styles.panelInner}>
                      {it.contentTitle && (
                        <div className={styles.contentTitle}>
                          {it.contentTitle}
                        </div>
                      )}

                      {it.content}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.fadeBottom} aria-hidden="true" />
      </div>
    </section>
  );
}

const defaultItems = [
  {
    q: "where is your studio?",
    a: "our studio is placed in a beautiful historical district in ny.",
    content: null,
    contentTitle: "for who?",
  },
  {
    q: "for who?",
    a: "taped is made for actors who want to level up their presentation.",
    content: (
      <div className="twoCols">
        <p>
          is an actor from Barcelona, now based in New York. He brings an
          understanding of performance and how to make people feel comfortable
          in front of the camera.
        </p>
        <p>
          our mission is to build a one-stop service that covers every aspect of
          an actor’s presentation and personal branding.
        </p>
      </div>
    ),
    contentTitle: "for who?",
  },
  {
    q: "for who?",
    a: "taped is made for actors who want to level up their presentation.",
    content: (
      <div className="twoCols">
        <p>
          is an actor from barcelona, now based in new york. he brings an
          understanding of performance and how to make people feel comfortable
          in front of the camera.
        </p>
        <p>
          our mission is to build a one-stop service that covers every aspect of
          an actor’s presentation and personal branding.
        </p>
      </div>
    ),
    contentTitle: "for who?",
  },
  {
    q: "for who?",
    a: "taped is made for actors who want to level up their presentation.",
    content: (
      <div className="twoCols">
        <p>
          is an actor from barcelona, now based in new york. he brings an
          understanding of performance and how to make people feel comfortable
          in front of the camera.
        </p>
        <p>
          our mission is to build a one-stop service that covers every aspect of
          an actor’s presentation and personal branding.
        </p>
      </div>
    ),
    contentTitle: "for who?",
  },
  {
    q: "for who?",
    a: "taped is made for actors who want to level up their presentation.",
    content: (
      <div className="twoCols">
        <p>
          is an actor from barcelona, now based in new york. he brings an
          understanding of performance and how to make people feel comfortable
          in front of the camera.
        </p>
        <p>
          our mission is to build a one-stop service that covers every aspect of
          an actor’s presentation and personal branding.
        </p>
      </div>
    ),
    contentTitle: "for who?",
  },
  {
    q: "for who?",
    a: "taped is made for actors who want to level up their presentation.",
    content: (
      <div className="twoCols">
        <p>
          is an actor from barcelona, now based in new york. he brings an
          understanding of performance and how to make people feel comfortable
          in front of the camera.
        </p>
        <p>
          our mission is to build a one-stop service that covers every aspect of
          an actor’s presentation and personal branding.
        </p>
      </div>
    ),
    contentTitle: "for who?",
  },
];
