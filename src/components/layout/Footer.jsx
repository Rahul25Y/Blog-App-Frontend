import React from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto py-5 border-top"
      style={{
        backgroundColor: "var(--card-bg)",
        borderTop: "1px solid var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="container">
        <div className="row gy-4">
          
          {/* Brand & Tagline */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-primary mb-3">BlogVerse</h5>
            <p className="text-muted-custom mb-3" style={{ fontSize: "0.9rem", maxWidth: "280px" }}>
              A premium space to share your ideas, learn, and grow with technology blogs.
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-custom hover-icon"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-custom hover-icon"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="mailto:contact@blogverse.com"
                className="text-muted-custom hover-icon"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
              Company
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.9rem" }}>
              <li>
                <Link to="/" onClick={(e) => e.preventDefault()} className="text-muted-custom text-decoration-none hover-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" onClick={(e) => e.preventDefault()} className="text-muted-custom text-decoration-none hover-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
              Resources
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.9rem" }}>
              <li>
                <Link to="/" onClick={(e) => e.preventDefault()} className="text-muted-custom text-decoration-none hover-link">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/" onClick={(e) => e.preventDefault()} className="text-muted-custom text-decoration-none hover-link">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal/Misc */}
          <div className="col-12 col-md-2">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
              Platform
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.9rem" }}>
              <li>
                <span className="text-muted-custom">Status: Active</span>
              </li>
              <li>
                <span className="text-muted-custom">Version: 1.0.0</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <hr className="my-4" style={{ borderColor: "var(--border-color)", opacity: 0.6 }} />

        {/* Copyright */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <p className="text-muted-custom mb-0" style={{ fontSize: "0.85rem" }}>
            &copy; {currentYear} BlogVerse. All rights reserved.
          </p>
          <div className="d-flex gap-3" style={{ fontSize: "0.85rem" }}>
            <Link to="/" onClick={(e) => e.preventDefault()} className="text-muted-custom text-decoration-none hover-link">
              Privacy Policy
            </Link>
            <span className="text-muted-custom">|</span>
            <Link to="/" onClick={(e) => e.preventDefault()} className="text-muted-custom text-decoration-none hover-link">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
