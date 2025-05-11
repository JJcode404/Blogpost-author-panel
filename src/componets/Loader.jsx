import styles from "../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export { Loader };
