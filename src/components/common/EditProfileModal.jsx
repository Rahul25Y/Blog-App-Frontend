import { useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import { updateProfile } from "../../services/api";
import { updateProfileSuccess } from "../../redux/userSlice";

const EditProfileModal = ({ show, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const objectUrlRef = useRef("");

  useEffect(() => {
    let timeoutId;
    if (show) {
      timeoutId = setTimeout(() => setIsRendered(true), 10);
    } else {
      setIsRendered(false);
    }
    return () => clearTimeout(timeoutId);
  }, [show]);

  const profilePreview = useMemo(() => {
    if (selectedProfileImage) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      objectUrlRef.current = URL.createObjectURL(selectedProfileImage);
      return objectUrlRef.current;
    }
    return user?.profileImageUrl || "";
  }, [selectedProfileImage, user?.profileImageUrl]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  useEffect(() => {
    if (!show) {
      setSelectedProfileImage(null);
    }
  }, [show, user?.profileImageUrl]);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Please enter a valid email address",
        )
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        if (selectedProfileImage) {
          formData.append("profileImage", selectedProfileImage);
        }

        const data = await updateProfile(user._id, formData);

        if (data.success) {
          dispatch(updateProfileSuccess(data.data));
          toast.success("Profile updated successfully");
          onClose(); // Close modal automatically
        } else {
          toast.error(data.message || "Failed to update profile");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (!show) return null;

  const modalContent = (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: isRendered ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog-custom w-100"
        style={{
          maxWidth: "550px",
          transform: isRendered ? "translateY(0)" : "translateY(-20px)",
          transition: "transform 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content border-color shadow-lg"
          style={{
            backgroundColor: "var(--card-bg)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div className="modal-header border-bottom border-color p-3 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-bold text-color mb-0">
              Edit Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body text-color p-4">
              <div className="mb-3">
                <label
                  className="form-label fw-medium text-color"
                  htmlFor="modal-name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className={`form-control form-control-custom ${formik.touched.name ? (formik.errors.name ? "is-invalid" : "is-valid") : ""}`}
                  id="modal-name"
                  {...formik.getFieldProps("name")}
                  placeholder="Enter your name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label
                  className="form-label fw-medium text-color"
                  htmlFor="modal-email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className={`form-control form-control-custom ${formik.touched.email ? (formik.errors.email ? "is-invalid" : "is-valid") : ""}`}
                  id="modal-email"
                  {...formik.getFieldProps("email")}
                  placeholder="name@example.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label
                  className="form-label fw-medium text-color"
                  htmlFor="modal-profile-image"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="modal-profile-image"
                  accept="image/*"
                  className="form-control form-control-custom"
                  onChange={(e) =>
                    setSelectedProfileImage(e.target.files[0] || null)
                  }
                />
                {profilePreview && (
                  <div className="mt-3">
                    <p className="mb-2 text-muted-custom">Preview</p>
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="rounded"
                      style={{
                        width: "100%",
                        maxWidth: "160px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div
              className="modal-footer border-top border-color p-3 d-flex justify-content-end"
              style={{ gap: "12px" }}
            >
              <button
                type="button"
                className="btn d-flex align-items-center justify-content-center flex-grow-1 flex-sm-grow-0 pill-btn-hover"
                onClick={onClose}
                style={{
                  height: "48px",
                  borderRadius: "999px",
                  padding: "0 24px",
                  backgroundColor: "#F1F5F9",
                  color: "#334155",
                  border: "1px solid #CBD5E1",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s ease",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn d-flex align-items-center justify-content-center gap-2 flex-grow-1 flex-sm-grow-0 pill-btn-hover"
                disabled={isSubmitting}
                style={{
                  height: "48px",
                  borderRadius: "999px",
                  padding: "0 24px",
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
                  transition: "all 0.3s ease",
                }}
              >
                {isSubmitting ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <FiSave size={16} />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Render the modal directly into document.body
  return ReactDOM.createPortal(modalContent, document.body);
};

export default EditProfileModal;
