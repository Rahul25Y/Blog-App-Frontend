import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBlogs, removeBlog } from '../../redux/blogSlice';
import BlogCard from '../../components/common/BlogCard';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const MyBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useSelector(state => state.blog);
  const { user } = useSelector(state => state.user);
  
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const myBlogs = blogs.filter(blog => blog.creator?._id === user?._id || blog.creator === user?._id);

  const handleEdit = (blog) => {
    navigate(`/edit-blog/${blog._id}`);
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    const resultAction = await dispatch(removeBlog(blogToDelete._id));
    setIsDeleting(false);
    
    if (removeBlog.fulfilled.match(resultAction)) {
      toast.success("Blog deleted successfully");
      setBlogToDelete(null);
    } else {
      toast.error(resultAction.payload || "Failed to delete blog");
    }
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-4 fade-in-el">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-color mb-0">My Blogs</h2>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2 pill-btn-hover"
          onClick={() => navigate('/create-blog')}
          style={{ borderRadius: "999px", padding: "8px 24px", height: "48px" }}
        >
          <FiPlus size={18} /> <span className="d-none d-sm-inline fw-semibold">Create New</span>
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : myBlogs.length > 0 ? (
        <div className="row g-4">
          {myBlogs.map(blog => (
            <div className="col-12 col-md-6 col-xl-4" key={blog._id}>
              <BlogCard 
                blog={blog} 
                isOwner={true} 
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="You haven't written any blogs" subtitle="Share your thoughts with the world!" />
      )}

      <ConfirmDeleteModal 
        show={!!blogToDelete}
        onClose={() => setBlogToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Blog"
        message={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default MyBlogs;
