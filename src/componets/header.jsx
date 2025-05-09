function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>WordFlux Author Panel</h1>
        <p style={styles.subtitle}>
          Manage your content with clarity and control
        </p>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#ffffff",
    padding: "2rem 1rem",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "600",
    margin: "0",
    color: "#1a1a1a",
    fontFamily: "'Inter', sans-serif",
  },
  subtitle: {
    marginTop: "0.5rem",
    color: "#666",
    fontSize: "1rem",
    fontWeight: "400",
  },
};

export { Header };
