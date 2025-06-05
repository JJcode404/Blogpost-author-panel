import styles from "../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <img src="/loadingState.svg" alt="loading" />
    </div>
  );
}

export { Loader };
