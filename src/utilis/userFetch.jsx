import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

const useFetch = (url = "http://localhost:3000/posts") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  console.log("token form usefetch", token);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!url) {
      setError("URL is required");
      setLoading(false);
      return;
    }
    if (!token) {
      setError("No token found");
      setLoading(false);
      navigate("/unauthorized");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        navigate("/unauthorized");
        throw new Error("Authentication required");
      }

      if (response.status === 403) {
        navigate("/forbiden");
        throw new Error("Access denied");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export { useFetch };
