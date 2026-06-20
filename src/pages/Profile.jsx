import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FiUser, FiEdit2, FiTrash2, FiMail, FiHash, FiBookOpen } from "react-icons/fi";
import { deleteAccount } from "../services/api";
import { logout } from "../redux/userSlice";
import EditProfileModal from "../components/common/EditProfileModal";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) return;
    try {
      setIsDeleting(true);
      const data = await deleteAccount(user._id);
      if (data.success) {
        toast.success("Account deleted successfully");
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to delete account");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  if (!user) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  return (
    <div className="container py-4 fade-in-el">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0 text-color">My Profile</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-color shadow-sm mb-4" style={{ backgroundColor: "var(--card-bg)" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom border-color">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                  style={{ width: "80px", height: "80px", fontSize: "2rem", fontWeight: "bold" }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="fw-bold mb-1 text-color">{user.name}</h3>
                  <p className="text-muted-custom mb-0 d-flex align-items-center gap-2">
                    <FiMail size={16} /> {user.email}
                  </p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-3 rounded border border-color" style={{ backgroundColor: "var(--bg-color)" }}>
                    <p className="text-muted-custom mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.8rem" }}>
                      <FiHash className="me-1" /> User ID
                    </p>
                    <p className="mb-0 fw-medium text-color">{user._id}</p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="p-3 rounded border border-color" style={{ backgroundColor: "var(--bg-color)" }}>
                    <p className="text-muted-custom mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.8rem" }}>
                      <FiBookOpen className="me-1" /> Total Blogs
                    </p>
                    <p className="mb-0 fw-medium text-color">{user.blogs?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4 pt-3 border-top border-color">
                <button 
                  className="btn btn-primary-custom d-flex align-items-center gap-2"
                  onClick={() => setShowEditModal(true)}
                >
                  <FiEdit2 size={16} /> Edit Profile
                </button>
                <button 
                  className="btn btn-outline-danger d-flex align-items-center gap-2"
                  onClick={() => setShowModal(true)}
                >
                  <FiTrash2 size={16} /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
          <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-color shadow" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="modal-header border-bottom border-color">
                  <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                    <FiTrash2 /> Delete Account
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body text-color">
                  <p className="mb-0">Are you sure you want to delete your account? This action cannot be undone and you will lose access to all your blogs.</p>
                </div>
                <div className="modal-footer border-top border-color">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger d-flex align-items-center gap-2" 
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <FiTrash2 size={16} />
                    )}
                    Yes, Delete My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal show={showEditModal} onClose={() => setShowEditModal(false)} />
    </div>
  );
};

export default Profile;
