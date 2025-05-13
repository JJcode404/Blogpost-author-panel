import React from "react";
import { useRouteError } from "react-router-dom";
import styles from "../styles/NoFound.module.css";

function NotFound() {
  const error = useRouteError?.();

  const message =
    error?.statusText ||
    error?.message ||
    "Oops! The page you're looking for doesn't exist.";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export { NotFound };
