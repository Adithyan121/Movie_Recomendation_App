import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css"; // Updated Footer CSS
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Links Section */}
        <div className="footer-links">
          <Link to="/help" className="footer-link">Help Center</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/faq" className="footer-link">FAQ</Link>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon" />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>
            © 2025{" "}
            <a
              href="https://adithyan-phi.vercel.app/" // Replace with your desired link
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Adithyan G</strong>
            </a>{" "}
            | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
