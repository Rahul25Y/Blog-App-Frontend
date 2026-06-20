import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const ConfirmDeleteModal = ({ show, onClose, onConfirm, isDeleting, title = "Delete Item", message = "Are you sure you want to delete this?" }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={onClose}></div>
      <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }} onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content border-color shadow" style={{ backgroundColor: "var(--card-bg)", borderRadius: "16px" }}>
            <div className="modal-header border-bottom border-color p-3">
              <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                <FiTrash2 /> {title}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body text-color p-4">
              <p className="mb-0">{message}</p>
            </div>
            <div className="modal-footer border-top border-color p-3 gap-2">
              <button type="button" className="btn btn-outline-secondary pill-btn-hover flex-grow-1 flex-sm-grow-0" onClick={onClose} style={{ borderRadius: "999px", padding: "8px 24px" }}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger d-flex align-items-center justify-content-center gap-2 pill-btn-hover flex-grow-1 flex-sm-grow-0" 
                onClick={onConfirm}
                disabled={isDeleting}
                style={{ borderRadius: "999px", padding: "8px 24px" }}
              >
                {isDeleting ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <FiTrash2 size={16} />
                )}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
