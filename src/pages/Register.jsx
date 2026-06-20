import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../services/api";
import { authStart, authFailure } from "../redux/userSlice";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { isAuthenticated } = useAuth();
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
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
      password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Submitted");
      console.log(values);
      try {
        dispatch(authStart());
        const data = await registerUser(
          values.name,
          values.email,
          values.password,
        );

        if (data.success) {
          toast.success(
            data.message || "User created successfully! Please log in.",
          );
          dispatch(authFailure(null));
          navigate("/login");
        } else {
          const errorMsg = data.message || "Registration failed";
          dispatch(authFailure(errorMsg));
          toast.error(errorMsg);
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || err.message || "Registration failed";
        dispatch(authFailure(errorMsg));
        toast.error(errorMsg);
      }
    },
  });

  return (
    <div className="auth-page px-3">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="auth-card fade-in-el">
            
              <div className="text-center mb-4">
                <Link
                  to="/"
                  className="navbar-brand fw-extrabold text-primary"
                  style={{
                    fontSize: "1.75rem",
                    letterSpacing: "-0.5px",
                    textDecoration: "none",
                  }}
                >
                  <span>Blog</span>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: "300",
                    }}
                  >
                    Verse
                  </span>
                </Link>

                <p
                  className="text-muted-custom mt-2 mb-0"
                  style={{ fontSize: "0.95rem" }}
                >
                  Create an account to start sharing your ideas.
                </p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium text-color">
                      <FaUser className="me-1 text-primary" /> Full Name
                    </label>

                    <input
                      type="text"
                      className={`form-control form-control-custom ${
                        formik.touched.name
                          ? formik.errors.name
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      {...formik.getFieldProps("name")}
                      placeholder="Enter your full name"
                    />

                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium text-color">
                      <MdEmail className="me-1 text-primary" /> Email Address
                    </label>

                    <input
                      type="email"
                      className={`form-control form-control-custom ${
                        formik.touched.email
                          ? formik.errors.email
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      {...formik.getFieldProps("email")}
                      placeholder="Enter your email address"
                    />

                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium text-color">
                      <FaLock className="me-1 text-primary" /> Password
                    </label>

                    <input
                      type="password"
                      className={`form-control form-control-custom ${
                        formik.touched.password
                          ? formik.errors.password
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      {...formik.getFieldProps("password")}
                      placeholder="Enter your password"
                    />

                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium text-color">
                      <FaLock className="me-1 text-primary" /> Confirm Password
                    </label>

                    <input
                      type="password"
                      className={`form-control form-control-custom ${
                        formik.touched.confirmPassword
                          ? formik.errors.confirmPassword
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      {...formik.getFieldProps("confirmPassword")}
                      placeholder="Confirm your password"
                    />

                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100 d-flex justify-content-center align-items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p
                  className="text-muted-custom mb-0"
                  style={{ fontSize: "0.9rem" }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary fw-semibold text-decoration-none hover-link"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
