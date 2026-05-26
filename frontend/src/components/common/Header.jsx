import React, { use, useContext, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiUrl } from "../common/http";
import { CartContext } from "../context/Cart";
import { AdminAuthContext } from "../context/AdminAuth";
import logoImg from "../../assets/images/logo.png";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const { getQty } = useContext(CartContext);
  const { user } = useContext(AdminAuthContext);

  const fetchCategories = async () => {
    await fetch(`${apiUrl}/get-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setCategories(result.data);
        } else {
          toast.error(result.message);
        }
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header className="site-header shadow-sm">
      {/* Top announcement bar */}
      <div className="header-topbar">
        <span>
          Free shipping on orders above $99 — Use code <strong>STYLE25</strong>
        </span>
      </div>

      <div className="container">
        <Navbar expand="lg" className="py-0">
          <Navbar.Brand as={Link} to="/" className="me-4">
            <img
              src={logoImg}
              alt="Logo"
              width="160"
              style={{ maxHeight: 48, objectFit: "contain" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0 nav-categories" navbarScroll>
              {categories &&
                categories.map((category) => (
                  <Nav.Link
                    as={Link}
                    to={`/shop?category=${category.id}`}
                    key={category.id}
                    className="nav-cat-link"
                  >
                    {category.name}
                  </Nav.Link>
                ))}
            </Nav>

            <div className="nav-right d-flex align-items-center gap-2">
              {/* Search */}
              <button className="nav-icon-btn" aria-label="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Account */}
              <Link
                to={user ? "/admin/dashboard" : "/account/dashboard"}
                className="nav-icon-btn"
                aria-label="Account"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="nav-icon-btn cart-btn position-relative"
                aria-label="Cart"
              >
                <span className="cart-qty">{getQty()}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
