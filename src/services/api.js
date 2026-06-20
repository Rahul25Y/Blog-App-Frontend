import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to dynamically inject the JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper to remove sensitive fields from user object
export const sanitizeUser = (user) => {
  if (!user) return null;
  const { _id, name, email, blogs } = user;
  return { _id, name, email, blogs };
};

// Auth Endpoints
export const registerUser = async (name, email, password) => {
  const response = await api.post("/users", { name, email, password });
  if (response.data && response.data.data) {
    response.data.data = sanitizeUser(response.data.data);
  }
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/login", { email, password });
  if (response.data && response.data.data) {
    response.data.data = sanitizeUser(response.data.data);
  }
  return response.data;
};

export const updateProfile = async (id, name, email) => {
  // Only sending name and email as per requirements
  const response = await api.put(`/users/${id}`, { name, email });
  if (response.data && response.data.data) {
    response.data.data = sanitizeUser(response.data.data);
  }
  return response.data;
};

export const deleteAccount = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Blogs Endpoints
export const getAllBlogs = async () => {
  const response = await api.get("/blogs");
  return response.data;
};

export const createBlog = async (title, description, draft) => {
  const response = await api.post("/blogs", { title, description, draft });
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const updateBlog = async (id, title, description, draft) => {
  const response = await api.put(`/blogs/${id}`, { title, description, draft });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

export const toggleLikeBlog = async (id) => {
  const response = await api.post(`/blogs/likes/${id}`);
  return response.data;
};

export default api;
