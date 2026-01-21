import axios from "axios";

export const api = axios.create({
  baseURL: "https://front-test.hex.team",
});

export interface Link {
  id: number;
  short: string;
  target: string;
  counter: number;
}

export interface LogInResponse {
  access_token: string;
  token_type: "bearer";
}

export interface UserLogin {
  username: string;
  password: string;
}

export const register = (username: string, password: string) => {
  return api.post("/api/register", null, {
    params: { username, password },
  });
};

export const login = (username: string, password: string) => {
  return api.post<LogInResponse>("/api/login", { username, password });
};

export const squeezeLink = (link: string) => {
  return api.post("/api/squeeze", null, {
    params: { link },
  });
};

export const getStatistics = async (
  order: string,
  offset: number,
  limit: number,
): Promise<{ data: Link[]; total: number }> => {
  const res = await api.get<Link[]>("/api/statistics", {
    params: { order, offset, limit },
  });
  const total = Number(res.headers["x-total-count"] || 0);
  return { data: res.data, total };
};

// interceptor для подстановки токена

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// тестовый interceptor для 401

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
