import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog } from '../../redux/blogSlice';

const BlogCard = ({ blog, isOwner, onEdit, onDelete }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isLiked = user && blog.likes && blog.likes.includes(user._id);

  const handleLike = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(likeBlog(blog._id));
    }
  };

  return (
    <div className="card custom-card h-100 position-relative fade-in-el" style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease", borderRadius: "16px", overflow: "hidden", padding: "0" }}>
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Link to={`/blogs/${blog._id}`} className="text-decoration-none flex-grow-1">
            <h5 className="card-title fw-bold text-color mb-1" style={{ fontSize: "1.25rem", lineHeight: "1.4" }}>
              {blog.title}
            </h5>
          </Link>
          {blog.draft && (
            <span className="badge bg-warning-subtle text-warning border border-warning-subtle ms-2 rounded-pill px-2 py-1" style={{ fontSize: "0.7rem" }}>
              Draft
            </span>
          )}
        </div>
        
        <p className="card-text text-muted-custom mb-4 flex-grow-1" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {blog.description}
        </p>
        
        <div className="mt-auto border-top border-color pt-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2 text-muted-custom" style={{ fontSize: "0.85rem" }}>
            <div className="rounded-circle bg-primary-subtle text-primary d-flex justify-content-center align-items-center" style={{ width: "28px", height: "28px", fontSize: "0.8rem", fontWeight: "bold" }}>
              {blog.creator?.name?.charAt(0).toUpperCase() || <FiUser />}
            </div>
            <span className="fw-medium text-truncate" style={{ maxWidth: "120px" }}>
              {blog.creator?.name || 'Unknown User'}
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button 
              className={`btn btn-sm d-flex align-items-center gap-1 p-0 border-0 ${isLiked ? 'text-danger' : 'text-muted-custom'}`}
              onClick={handleLike}
              style={{ background: 'transparent' }}
            >
              <FiHeart fill={isLiked ? "currentColor" : "none"} style={{ transition: "all 0.2s ease" }} />
              <span className="fw-medium">{blog.likes?.length || 0}</span>
            </button>
            
            {isOwner && (
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary d-flex align-items-center p-1" onClick={() => onEdit(blog)} style={{ borderRadius: "6px" }} title="Edit Blog">
                  <FiEdit2 size={14} />
                </button>
                <button className="btn btn-sm btn-outline-danger d-flex align-items-center p-1" onClick={() => onDelete(blog)} style={{ borderRadius: "6px" }} title="Delete Blog">
                  <FiTrash2 size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
