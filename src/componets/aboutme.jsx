import React from "react";
import styles from "../styles/AboutMe.module.css";

const AboutMe = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>About</h2>
      <hr className={styles.separator} />
      <p className={styles.readTime}>1 min read (11 words)</p>

      <h3 className={styles.subTitle}>About me</h3>
      <div className={styles.info}>
        <p>Name: Kham Japher</p>
        <p>Occupation: Software Developer</p>
        <p>Location: Nairobi Kenya</p>
        <p>Age: 20</p>
      </div>
    </div>
  );
};

export { AboutMe };
