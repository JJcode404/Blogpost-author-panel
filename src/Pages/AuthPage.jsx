import { useState } from "react";
import { LoginForm } from "../componets/LoginForm";
import { Header } from "../componets/header";
import { SignupForm } from "../componets/singUpform";
import styles from "../styles/auth.module.css";

function AuthPage() {
  const [view, setView] = useState("login");
  return (
    <div className={styles.container}>
      <Header title={view === "login" ? "Log In" : "Sign Up"} />
      {view === "login" ? <LoginForm /> : <SignupForm />}
      <div className={styles.switcher}>
        {view === "login" ? (
          <p>
            No account?{" "}
            <button onClick={() => setView("signup")}>Sign Up</button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setView("login")}>Log In</button>
          </p>
        )}
      </div>
    </div>
  );
}
export { AuthPage };
