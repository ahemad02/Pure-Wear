import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/admin/Login";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./components/admin/Dashboard";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import { default as ShowCategory } from "./components/admin/category/Show";
import { default as CreateCategory } from "./components/admin/category/Create";
import { default as EditCategory } from "./components/admin/category/Edit";
import { default as ShowBrand } from "./components/admin/brand/Show";
import { default as CreateBrand } from "./components/admin/brand/Create";
import { default as EditBrand } from "./components/admin/brand/Edit";

import { default as ShowProducts } from "./components/admin/product/Show";
import { default as CreateProduct } from "./components/admin/product/Create";
import { default as EditProduct } from "./components/admin/product/Edit";
import Register from "./components/Register";
import { default as UserLogin } from "./components/Login";
import Profile from "./components/front/Profile";
import { RequireAuth } from "./components/RequireAuth";
import { NotRequireAuth } from "./components/NotRequireAuth";
import Confirmation from "./components/Confirmation";
import ShowOrders from "./components/admin/orders/ShowOrders";
import OrderDetails from "./components/admin/orders/OrderDetails";
import MyOrders from "./components/front/MyOrders";
import { default as UserOrderDetails } from "./components/front/OrderDetails";
import Shipping from "./components/admin/shipping/Shipping";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route
            path="/order/confirmation/:id"
            element={
              <RequireAuth>
                <Confirmation />
              </RequireAuth>
            }
          />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/account/register"
            element={
              <NotRequireAuth>
                <Register />
              </NotRequireAuth>
            }
          />
          <Route
            path="/account/login"
            element={
              <NotRequireAuth>
                <UserLogin />
              </NotRequireAuth>
            }
          />
          <Route
            path="/account/orders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />
          <Route
            path="/account/orders/details/:id"
            element={
              <RequireAuth>
                <UserOrderDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/account/dashboard"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRequireAuth>
                <Dashboard />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRequireAuth>
                <ShowCategory />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/categories/create"
            element={
              <AdminRequireAuth>
                <CreateCategory />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/categories/edit/:id"
            element={
              <AdminRequireAuth>
                <EditCategory />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/brands"
            element={
              <AdminRequireAuth>
                <ShowBrand />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/brands/create"
            element={
              <AdminRequireAuth>
                <CreateBrand />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/brands/edit/:id"
            element={
              <AdminRequireAuth>
                <EditBrand />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/shipping/"
            element={
              <AdminRequireAuth>
                <Shipping />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRequireAuth>
                <ShowProducts />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/products/create"
            element={
              <AdminRequireAuth>
                <CreateProduct />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminRequireAuth>
                <EditProduct />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRequireAuth>
                <ShowOrders />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/orders/:id"
            element={
              <AdminRequireAuth>
                <OrderDetails />
              </AdminRequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
