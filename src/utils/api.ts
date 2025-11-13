import axios from "axios";
import {
  getToken,
  getTokenRefresh,
  setToken,
  setTokenRefresh,
  clearTokens
} from "./token";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error || !error.config) return Promise.reject(error);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      const refreshToken = getTokenRefresh();
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(`${BASE_URL}/auth/refresh`, { 
          refreshToken: refreshToken 
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data;

        setToken(accessToken);
        setTokenRefresh(newRefreshToken);
        
        api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        
        originalRequest.headers["Authorization"] = "Bearer " + accessToken;

        processQueue(null, accessToken);

        return api(originalRequest);
      } catch (err: any) {
        console.error("Token refresh failed:", err);
        
        processQueue(err, null);
        
        clearTokens();
        
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = "/login";
        }
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const logout = async () => {
  // const refreshToken = getTokenRefresh();
  try {
    // if (refreshToken) {
    //   await api.post("/auth/logout", { refreshToken });
    // }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    clearTokens();
  }
};

export default api;