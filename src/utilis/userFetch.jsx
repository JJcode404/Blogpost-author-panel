import { useState, useEffect, useCallback } from "react";

const useFetch = (url = "http://localhost:3000/posts") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!url) {
      setError("URL is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { mode: "cors" });
      if (response.status >= 400) {
        throw new Error("Server error");
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
