import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Blogs from "../pages/Blog/Blogs";
import BlogDetails from "../pages/Blog/BlogDetails";
import CreateBlog from "../pages/Blog/CreateBlog";
import MyBlogs from "../pages/Blog/MyBlogs";
import LikedBlogs from "../pages/Blog/LikedBlogs";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected SaaS App Section */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog/:id" element={<CreateBlog isEdit={true} />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/liked-blogs" element={<LikedBlogs />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
