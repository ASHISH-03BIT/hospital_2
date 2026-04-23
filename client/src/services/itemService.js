const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const parseResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const getLostItems = async (params = "") => {
  const response = await fetch(`${API_BASE_URL}/api/lost-items${params ? `?${params}` : ""}`, {
    headers: getAuthHeaders(),
  });
  return parseResponse(response);
};

export const getFoundItems = async (params = "") => {
  const response = await fetch(`${API_BASE_URL}/api/found-items${params ? `?${params}` : ""}`, {
    headers: getAuthHeaders(),
  });
  return parseResponse(response);
};

export const getLostItemById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/lost-items/${id}`, {
    headers: getAuthHeaders(),
  });
  return parseResponse(response);
};

export const createLostItem = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/lost-items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
};

export const createFoundItem = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/found-items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
};

export const claimItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/items/${id}/claim`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  return parseResponse(response);
};
