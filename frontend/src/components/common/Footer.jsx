import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Trust strip */}
      <div className="footer-trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5z" />
                </svg>
              </div>
              <div>
                <h4>Free Delivery</h4>
                <p>On all orders above $99</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1z" />
                </svg>
              </div>
              <div>
                <h4>Money Back Guarantee</h4>
                <p>30-day hassle-free returns</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                </svg>
              </div>
              <div>
                <h4>Secure Payments</h4>
                <p>SSL-encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand-col">
              <img src={logoImg} alt="Logo" width={140} className="mb-3" />
              <p className="footer-tagline">
                Your fashion partner for every season and story. Curated with
                care, delivered with love.
              </p>
              <div className="social-links mt-4">
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="17.5"
                      y1="6.5"
                      x2="17.51"
                      y2="6.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-nav-col">
              <h5>Categories</h5>
              <ul>
                <li>
                  <Link to="/shop?category=kids">Kids</Link>
                </li>
                <li>
                  <Link to="/shop?category=women">Women</Link>
                </li>
                <li>
                  <Link to="/shop?category=men">Men</Link>
                </li>
                <li>
                  <Link to="/shop?category=accessories">Accessories</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h5>Quick Links</h5>
              <ul>
                <li>
                  <Link to="/account/login">Login</Link>
                </li>
                <li>
                  <Link to="/account/register">Register</Link>
                </li>
                <li>
                  <Link to="/account/orders">My Orders</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h5>Get In Touch</h5>
              <ul>
                <li>
                  <a href="tel:+91123456789">+91-123456789</a>
                </li>
                <li>
                  <a href="mailto:info@gmail.com">info@gmail.com</a>
                </li>
                <li>
                  <a href="#">Live Chat</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
