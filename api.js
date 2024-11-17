// api.js
const BASE_URL = "http://127.0.0.1:8000"; // Базовый URL сервера

// Helper для обработки запросов
const request = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Ошибка сервера");
  }

  return response.json();
};

// Методы API
const API = {
  // Пользователи
  login: (email, password) =>
    request("/users/login", "POST", { email, password }),

  register: (email, password, name) =>
    request("/users/register", "POST", { email, password, name }),

  // Лоты
  getLots: (token) => request("/lots", "GET", null, token),

  createLot: (lotData, token) =>
    request("/lots", "POST", lotData, token),

  updateLot: (id, lotData, token) =>
    request(`/lots/${id}`, "PUT", lotData, token),

  deleteLot: (id, token) => request(`/lots/${id}`, "DELETE", null, token),

  // Аренда
  rentLot: (id, dates, token) =>
    request(`/lots/${id}/rent`, "POST", dates, token),

  getActiveRents: (token) => request("/rents/active", "GET", null, token),

  getRentHistory: (token) => request("/rents/history", "GET", null, token),
};

export default API;
