const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const request = async (path, payload) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication request failed");
  }

  if (data?.data?.token) {
    localStorage.setItem("token", data.data.token);
  }

  if (data?.data?.user) {
    localStorage.setItem("user", JSON.stringify(data.data.user));
  }

  return data;
};

export const signupUser = async (payload) => request("/auth/signup", payload);
export const loginUser = async (payload) => request("/auth/login", payload);

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => Boolean(localStorage.getItem("token"));

export const getStoredUser = () => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};
