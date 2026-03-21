export const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.origin.includes("localhost")
    ? "http://localhost:5000/api"
    : "https://sek-d05o.onrender.com/api");

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("sekina_auth_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    method,
    headers,
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, config);
    const data = await res.json();
    // 401 on /auth/me is expected when not logged in — don't log as error
    if (!res.ok && !(res.status === 401 && endpoint === "/auth/me")) {
      if (import.meta.env.MODE === "development") {
        console.warn(`API ${method} ${endpoint} →`, res.status, data?.message || '');
      }
    }
    return data;
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error(`API network error (${endpoint}):`, error);
    }
    return { success: false, message: "Server connection failed" };
  }
};
