import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogSlice';
import BlogCard from '../../components/common/BlogCard';
import EmptyState from '../../components/common/EmptyState';
import { FiSearch } from 'react-icons/fi';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector(state => state.blog);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const filteredBlogs = blogs.filter(blog => 
    !blog.draft && (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container-fluid py-4 px-3 px-md-4 fade-in-el">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="fw-bold text-color mb-0">All Blogs</h2>
        <div className="position-relative" style={{ maxWidth: "400px", width: "100%" }}>
          <FiSearch className="position-absolute top-50 translate-middle-y text-muted-custom" style={{ left: "15px" }} />
          <input 
            type="text" 
            className="form-control form-control-custom ps-5" 
            placeholder="Search blogs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="row g-4">
          {filteredBlogs.map(blog => (
            <div className="col-12 col-md-6 col-xl-4" key={blog._id}>
              <BlogCard blog={blog} isOwner={false} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No blogs found" subtitle={searchTerm ? "Try a different search term" : "Check back later for new content."} />
      )}
    </div>
  );
};

export default Blogs;
