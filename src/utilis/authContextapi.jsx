import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error("Invalid token", e);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log("Login successful:", data);
    localStorage.setItem("token", data.Token);
    setUser(data.user);
    return data;
  };

  const signUp = async (fullname, email, password) => {
    const response = await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullname }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Login failed:", data);
      throw new Error(data.error);
    }
    console.log("this function is read");
    const LoginInUser = await login(email, password);
    console.log(
      "here is the user data returned from signup user so this means you have loged in",
      LoginInUser
    );

    setUser(LoginInUser);
    console.log("signup successful:", LoginInUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
