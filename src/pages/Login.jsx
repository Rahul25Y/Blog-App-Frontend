import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdEmail, MdLock } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../services/api";
import { authStart, authSuccess, authFailure } from "../redux/userSlice";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const { loading, error } = useSelector((state) => state.user);
  
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Submitted");
      console.log(values);
      try {
        dispatch(authStart());
        const data = await loginUser(values.email, values.password);
        
        if (data.success) {
          dispatch(authSuccess({ user: data.data, token: data.token }));
          toast.success(data.message || "User login successfully");
          navigate("/");
        } else {
          const errorMsg = data.message || "Login failed";
          dispatch(authFailure(errorMsg));
          toast.error(errorMsg);
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || "Login failed";
        dispatch(authFailure(errorMsg));
        toast.error(errorMsg);
      }
    },
  });

  return (
    <div className="auth-page px-3">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="auth-card fade-in-el">
              <div className="text-center mb-4">
                <Link to="/" className="navbar-brand fw-extrabold text-primary" style={{ fontSize: "1.75rem", letterSpacing: "-0.5px", textDecoration: "none" }}>
                  <span>Blog</span>
                  <span style={{ color: "var(--text-secondary)", fontWeight: "300" }}>Verse</span>
                </Link>
          <p className="text-muted-custom mt-2 mb-0" style={{ fontSize: "0.95rem" }}>
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label fw-medium text-color d-inline-flex align-items-center gap-1" htmlFor="email">
              <MdEmail className="text-primary" /> Email address
            </label>
            <input
              type="email"
              className={`form-control form-control-custom ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="Please enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label fw-medium text-color mb-0 d-inline-flex align-items-center gap-1" htmlFor="password">
                <MdLock className="text-primary" /> Password
              </label>
            </div>
            <input
              type="password"
              className={`form-control form-control-custom ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
              id="password"
              {...formik.getFieldProps("password")}
              placeholder="Please enter your password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary-custom w-100 d-flex justify-content-center align-items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted-custom mb-0" style={{ fontSize: "0.9rem" }}>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold text-decoration-none hover-link">
              Register
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

export default Login;

