import { useEffect } from "react";
import ReactDOM from "react-dom";

const BlogPreviewModal = ({ show, onClose, blog }) => {
  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  if (!show || !blog) return null;

  const isImageFile = blog?.fileType?.startsWith("image/");

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="modal-content border-color shadow"
            style={{ backgroundColor: "var(--card-bg)", borderRadius: "16px" }}
          >
            <div className="modal-header border-bottom border-color p-3 d-flex align-items-center justify-content-between">
              <h5 className="modal-title fw-bold text-color mb-0">
                Blog Preview
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body text-color p-4">
              {blog.fileUrl && isImageFile && (
                <div
                  className="mb-4 overflow-hidden rounded"
                  style={{ width: "100%", maxHeight: "320px" }}
                >
                  <img
                    src={blog.fileUrl}
                    alt={blog.title}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "14px",
                    }}
                  />
                </div>
              )}

              <h5 className="fw-bold text-color mb-3">{blog.title}</h5>
              <p
                className="text-muted-custom mb-4"
                style={{ whiteSpace: "pre-line" }}
              >
                {blog.description}
              </p>
              <div
                className="d-flex align-items-center gap-2 text-muted-custom"
                style={{ fontSize: "0.95rem" }}
              >
                <span className="fw-semibold">Author:</span>
                <span>{blog.creator?.name || "Unknown Author"}</span>
              </div>
            </div>
            <div className="modal-footer border-top border-color p-3">
              <button
                type="button"
                className="btn btn-secondary pill-btn-hover"
                onClick={onClose}
                style={{ borderRadius: "999px", padding: "8px 24px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default BlogPreviewModal;
