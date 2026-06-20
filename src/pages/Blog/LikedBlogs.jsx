import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogSlice';
import BlogCard from '../../components/common/BlogCard';
import EmptyState from '../../components/common/EmptyState';

const LikedBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector(state => state.blog);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const likedBlogs = blogs.filter(blog => blog.likes && blog.likes.includes(user?._id));

  return (
    <div className="container-fluid py-4 px-3 px-md-4 fade-in-el">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-color mb-0">Liked Blogs</h2>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : likedBlogs.length > 0 ? (
        <div className="row g-4">
          {likedBlogs.map(blog => (
            <div className="col-12 col-md-6 col-xl-4" key={blog._id}>
              <BlogCard blog={blog} isOwner={false} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No liked blogs yet" subtitle="Explore the community and find blogs you love!" />
      )}
    </div>
  );
};

export default LikedBlogs;
