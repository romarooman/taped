import React, { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    project: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section id="contacts" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          text us and let’s
          <br />
          do it together!
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>your name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="name"
            />
          </div>

          <div className={styles.field}>
            <label>your whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="number"
            />
          </div>

          <div className={styles.field}>
            <label>your project</label>
            <input
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="name"
      
            />
          </div>

          <button type="submit" className={styles.button}>
            book
          </button>
        </form>
      </div>
    </section>
  );
}
