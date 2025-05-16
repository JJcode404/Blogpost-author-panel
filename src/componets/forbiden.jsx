import styles from "../styles/NoFound.module.css";

function Forbidden() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>403</h1>
      <h2 className={styles.subtitle}>Forbidden</h2>
      <p className={styles.message}>
        You do not have permission to access this page.
      </p>
    </div>
  );
}

export { Forbidden };
