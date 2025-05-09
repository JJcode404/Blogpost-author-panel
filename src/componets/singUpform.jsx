import { useState } from "react";
import styles from "../styles/auth.module.css";
import { useAuth } from "../utilis/authContextapi";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const { user, setUser, login, signUp } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const signUpUserData = await signUp(fullname, email, password);
      navigate("/");
    } catch (e) {
      setError(e.message || "sign up failed");
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <label>
        Fullname:
        <input
          type="text"
          value={fullname}
          name="fullname"
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" required />
      </label>
      <button type="submit">Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export { SignupForm };
