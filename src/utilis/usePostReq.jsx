import { useState } from "react";

const usePostReq = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const postData = async (url, payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do not set Content-Type here when using FormData
        },
        body: payload, // Send the FormData directly as the body
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message =
          response.status === 403
            ? errorData.error || "Session expired. Please log in again."
            : errorData.error || "Server error";
        throw new Error(message);
      }

      const result = await response.json();
      setData(result);
      alert("Post created!");
      return result;
    } catch (err) {
      setError(err.message || "Unknown error");
      alert(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
};

export { usePostReq };
