import styles from "../styles/NoFound.module.css";

function Unauthorized() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>401</h1>
      <h2 className={styles.subtitle}>Unauthorized</h2>
      <p className={styles.message}>You must be logged in to view this page.</p>
      <a href="http://localhost:5174/account" className={styles.link}>
        Go to Login Page
      </a>
    </div>
  );
}

export { Unauthorized };
