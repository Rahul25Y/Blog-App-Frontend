import { Link } from "react-router-dom";
import { FiHeart, FiEdit2, FiTrash2, FiUser, FiFileText } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog } from "../../redux/blogSlice";
import ReadMoreModal from "./ReadMoreModal";

const BlogCard = ({ blog, isOwner, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isLiked = user && blog.likes && blog.likes.includes(user._id);
  const isImageFile = blog?.fileType?.startsWith("image/");
  const isPdfFile =
    blog?.fileType === "application/pdf" ||
    blog?.fileUrl?.toLowerCase().endsWith(".pdf");

  const handleLike = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(likeBlog(blog._id));
    }
  };

  return (
    <div
      className="card custom-card h-100 position-relative fade-in-el"
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        borderRadius: "16px",
        overflow: "hidden",
        padding: "0",
      }}
    >
      <div className="card-body d-flex flex-column h-100 p-2">
        {blog.fileUrl && isImageFile && (
          <div
            className="mb-3 overflow-hidden rounded"
            style={{ width: "100%", height: "220px" }}
          >
            <img
              src={blog.fileUrl}
              alt={blog.title}
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                display: "block",
                borderRadius: "12px",
              }}
            />
          </div>
        )}

        {blog.fileUrl && isPdfFile && (
          <div className="mb-3 d-flex align-items-center gap-2">
            <FiFileText size={18} className="text-secondary" />
            <span
              className="badge bg-info-subtle text-info rounded-pill py-1 px-2"
              style={{ fontSize: "0.75rem" }}
            >
              PDF Attachment
            </span>
          </div>
        )}

        <div
          className="d-flex justify-content-between align-items-start mb-3"
          // style={{ minHeight: "90px" }}
        >
          <Link
            to={`/blogs/${blog._id}`}
            className="text-decoration-none flex-grow-1 text-parimary "
          >
            <h6
              className="card-title text-colord mb-1 text-primary"
              style={{ fontSize: "1.1rem", lineHeight: "1.4" }}
            >
              <span className="fw-bold">Title:</span> {blog.title}
            </h6>
          </Link>
          {blog.draft && (
            <span
              className="badge bg-warning-subtle text-warning border border-warning-subtle ms-2 rounded-pill px-2 py-1"
              style={{ fontSize: "0.7rem" }}
            >
              Draft
            </span>
          )}
        </div>

        <div className="flex-grow-1 text-color">
          <span className="fw-bold">Description:</span>{" "}
          <ReadMoreModal
            text={blog.description}
            title={blog.title}
            maxLength={45}
          />
        </div>

        <div className="mt-auto border-top border-color pt-3 d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center gap-2 text-muted-custom"
            style={{ fontSize: "0.85rem" }}
          >
            {blog?.creator?.profileImageUrl ? (
              <img
                src={blog?.creator?.profileImageUrl}
                alt={blog?.creator?.name || "Author"}
                className="rounded-circle"
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {blog?.creator?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span
              className="fw-medium text-truncate"
              style={{ maxWidth: "120px" }}
            >
              {blog?.creator?.name || "Unknown User"}
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              className={`btn btn-sm d-flex align-items-center gap-1 p-0 border-0 ${isLiked ? "text-danger" : "text-muted-custom"}`}
              onClick={handleLike}
              style={{ background: "transparent" }}
            >
              <FiHeart
                fill={isLiked ? "currentColor" : "none"}
                style={{ transition: "all 0.2s ease" }}
              />
              <span className="fw-medium">{blog.likes?.length || 0}</span>
            </button>

            {isOwner && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary d-flex align-items-center p-1"
                  onClick={() => onEdit(blog)}
                  style={{ borderRadius: "6px" }}
                  title="Edit Blog"
                >
                  <FiEdit2 size={14} />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger d-flex align-items-center p-1"
                  onClick={() => onDelete(blog)}
                  style={{ borderRadius: "6px" }}
                  title="Delete Blog"
                >
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
