import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleBlog,
  likeBlog,
  clearCurrentBlog,
} from "../../redux/blogSlice";
import { FiHeart, FiUser, FiArrowLeft, FiFileText } from "react-icons/fi";
import EmptyState from "../../components/common/EmptyState";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBlog, loading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSingleBlog(id));

    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, id]);

  const isLiked =
    user && currentBlog?.likes && currentBlog.likes.includes(user._id);
  const isImageFile = currentBlog?.fileType?.startsWith("image/");
  const isPdfFile =
    currentBlog?.fileType === "application/pdf" ||
    currentBlog?.fileUrl?.toLowerCase().endsWith(".pdf");

  const handleLike = () => {
    if (user && currentBlog) {
      dispatch(likeBlog(currentBlog._id));
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error || !currentBlog) {
    return (
      <EmptyState
        title="Blog not found"
        subtitle="The blog you are looking for does not exist or has been removed."
      />
    );
  }

  return (
    <div className="container-fluid py-4 px-3 px-md-4 fade-in-el">
      <button
        className="btn btn-link text-decoration-none text-muted-custom p-0 mb-4 d-flex align-items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft /> Back
      </button>

      <div
        className="custom-card p-4 p-md-5 mx-auto"
        style={{ maxWidth: "800px" }}
      >
        {currentBlog.draft && (
          <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-3 py-2 mb-3">
            Draft
          </span>
        )}

        <h1
          className="fw-bold text-color mb-4"
          style={{ fontSize: "2.5rem", lineHeight: "1.2" }}
        >
          {currentBlog.title}
        </h1>

        <div className="d-flex justify-content-between align-items-center border-bottom border-color pb-4 mb-4">
          <div className="d-flex align-items-center gap-3">
            {currentBlog.creator?.profileImageUrl ? (
              <img
                src={currentBlog.creator.profileImageUrl}
                alt={currentBlog.creator?.name || "Author"}
                className="rounded-circle"
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                {currentBlog.creator?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="fw-semibold text-color mb-0">
                {currentBlog.creator?.name || "Unknown Author"}
              </p>
              <p className="text-muted-custom small mb-0">
                {currentBlog.creator?.email || ""}
              </p>
            </div>
          </div>

          <button
            className={`btn d-flex align-items-center gap-2 px-3 py-2 ${isLiked ? "btn-danger" : "btn-outline-custom"}`}
            onClick={handleLike}
            style={{ borderRadius: "999px" }}
          >
            <FiHeart fill={isLiked ? "currentColor" : "none"} />
            <span className="fw-medium">{currentBlog.likes?.length || 0}</span>
          </button>
        </div>

        {currentBlog.fileUrl && (
          <div className="mb-4">
            {isImageFile && (
              <img
                src={currentBlog.fileUrl}
                alt={currentBlog.title}
                className="w-100 rounded"
                style={{ maxHeight: "420px", objectFit: "contain" }}
              />
            )}
            {isPdfFile && (
              <div
                className="d-flex align-items-center justify-content-between gap-3 rounded-3 border border-color p-3"
                style={{ backgroundColor: "rgba(37,99,235,0.04)" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <FiFileText size={24} className="text-primary" />
                  <div>
                    <p className="mb-1 fw-semibold text-color">
                      PDF Attachment
                    </p>
                    <p
                      className="mb-0 text-muted-custom"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {currentBlog.fileName || "View document"}
                    </p>
                  </div>
                </div>
                <a
                  href={currentBlog.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-primary"
                  style={{ borderRadius: "999px" }}
                >
                  Open PDF
                </a>
              </div>
            )}
          </div>
        )}

        <div
          className="blog-content text-color"
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
          }}
        >
          {currentBlog.description}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
