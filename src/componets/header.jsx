import { Link } from "react-router-dom";
import styles from "../styles/auth.module.css";

function Logo() {
  return (
    <Link to={"/"}>
      <div className={styles.logo}>★ WordFlux ★</div>
    </Link>
  );
}

function Header({ title }) {
  return (
    <header>
      <Logo />
      <hr className={styles.hr} />
      <h1>{title}</h1>
    </header>
  );
}

export { Header };
