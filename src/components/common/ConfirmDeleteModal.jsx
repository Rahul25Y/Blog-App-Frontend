import React from "react";
import ReactDOM from "react-dom";
import { FiTrash2 } from "react-icons/fi";

const ConfirmDeleteModal = ({
  show,
  onClose,
  onConfirm,
  isDeleting,
  title = "Delete Item",
  message = "Are you sure you want to delete this?",
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-backdrop fade show"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
        }}
        onClick={onClose}
      />

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
        }}
      >
        <div className="d-flex justify-content-center align-items-center h-100 px-3">
          <div
            className="modal-dialog m-0"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content border-color shadow"
              style={{
                backgroundColor: "var(--card-bg)",
                borderRadius: "16px",
              }}
            >
              <div className="modal-header border-bottom border-color p-3">
                <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                  <FiTrash2 />
                  {title}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                />
              </div>

              <div className="modal-body text-color p-4">
                <p className="mb-0">{message}</p>
              </div>

              <div className="modal-footer border-top border-color p-3 gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                  style={{
                    borderRadius: "999px",
                    padding: "6px 29px",
                  }}
                >
                  No
                </button>

                <button
                  type="button"
                  className="btn btn-danger d-flex align-items-center gap-2"
                  onClick={onConfirm}
                  disabled={isDeleting}
                  style={{
                    borderRadius: "999px",
                    padding: "6px 24px",
                  }}
                >
                  {isDeleting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                  ) : (
                    <FiTrash2 size={16} />
                  )}

                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ConfirmDeleteModal;