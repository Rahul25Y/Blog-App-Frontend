import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FiHome,
  FiBookOpen,
  FiPlusSquare,
  FiHeart,
  FiFolder,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { logout } from "../../redux/userSlice";

const Sidebar = ({ isCollapsed, isMobileOpen, onCloseMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    if (onCloseMobile) onCloseMobile();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <FiHome size={18} /> },
    { name: "Blogs", path: "/blogs", icon: <FiBookOpen size={18} /> },
    { name: "Create Blog", path: "/create-blog", icon: <FiPlusSquare size={18} /> },
    { name: "Liked Blogs", path: "/liked-blogs", icon: <FiHeart size={18} /> },
    { name: "My Blogs", path: "/my-blogs", icon: <FiFolder size={18} /> },
    { name: "Profile", path: "/profile", icon: <FiUser size={18} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 1010,
          }}
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`sidebar-wrapper ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "mobile-show" : ""
        }`}
      >
        <div className="sidebar-nav d-flex flex-column p-0 h-100">
          <div className="sidebar-links flex-grow-1" style={{ overflowY: "auto", padding: "16px 12px" }}>
            {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-nav-link ${isActive ? "active" : ""}`
              }
              onClick={onCloseMobile}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
          </div>

          <div style={{ padding: "0 12px 16px 12px", marginTop: "auto" }}>
            <a
              href="#logout"
              className="sidebar-nav-link logout-link mb-0"
              onClick={handleLogout}
            >
              <FiLogOut size={18} />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
