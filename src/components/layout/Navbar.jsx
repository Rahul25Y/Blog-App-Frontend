import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../redux/userSlice";
import SearchBar from "../common/SearchBar";
import ThemeToggle from "../common/ThemeToggle";
import EditProfileModal from "../common/EditProfileModal";

const Navbar = ({ onToggleSidebar }) => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Get initials for profile placeholder
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top px-3 py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Left Section: Menu Toggle + Logo */}
        <div className="d-flex align-items-center gap-2">
          {isAuthenticated && (
            <button
              className="btn btn-link text-muted-custom p-1 me-2 hover-icon"
              onClick={onToggleSidebar}
              style={{ border: "none", background: "none" }}
              aria-label="Toggle sidebar"
            >
              <FiMenu size={22} />
            </button>
          )}
          <Link
            to="/"
            className="navbar-brand fw-extrabold d-flex align-items-center text-primary"
            style={{ fontSize: "1.35rem", letterSpacing: "-0.5px" }}
          >
            <span style={{ fontWeight: "800" }}>Blog</span>
            <span
              className="text-secondary-custom fw-light"
              style={{ color: "var(--text-secondary)" }}
            >
              Verse
            </span>
          </Link>
        </div>

        {/* Center Section: Search Blogs */}
        <div className="d-none d-md-block flex-grow-1 mx-4 d-flex justify-content-center">
          {isAuthenticated && <SearchBar />}
        </div>

        {/* Right Section: Theme Toggle + User Profile */}
        <div className="d-flex align-items-center gap-3">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <div className="dropdown">
              <button
                className="btn d-flex align-items-center gap-2 p-1 border-0 dropdown-toggle text-color"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ background: "none", color: "var(--text-color)" }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold bg-primary overflow-hidden"
                  style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                >
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.name || "Avatar"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase() || <FiUser />
                  )}
                </div>
                <span
                  className="d-none d-sm-inline-block fw-semibold text-sm"
                  style={{ fontSize: "0.9rem" }}
                >
                  {user.name}
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end border-color shadow-sm mt-2 py-2"
                aria-labelledby="profileDropdown"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <li className="px-3 py-2 border-bottom border-color mb-1">
                  <div
                    className="fw-bold text-color text-truncate"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {user.name}
                  </div>
                  <div
                    className="text-muted-custom text-truncate"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {user.email}
                  </div>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2 py-2 text-color hover-item"
                    to="/profile"
                    style={{ fontSize: "0.9rem" }}
                  >
                    👤 My Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2 text-color hover-item"
                    onClick={() => setShowEditModal(true)}
                    style={{ fontSize: "0.9rem" }}
                  >
                    ✏️ Edit Profile
                  </button>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2 py-2 text-color hover-item"
                    to="/my-blogs"
                    style={{ fontSize: "0.9rem" }}
                  >
                    📚 My Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2 py-2 text-color hover-item"
                    to="/liked-blogs"
                    style={{ fontSize: "0.9rem" }}
                  >
                    ❤️ Liked Blogs
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger hover-item"
                    onClick={handleLogout}
                    style={{ fontSize: "0.9rem" }}
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-sm btn-outline-custom">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary-custom">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      <EditProfileModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </nav>
  );
};

export default Navbar;
