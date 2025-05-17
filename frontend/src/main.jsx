import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.scss";
import { AdminAuthProvider } from "./components/context/AdminAuth.jsx";
import { CartProvider } from "./components/context/Cart.jsx";
import { AuthProvider } from "./components/context/Auth.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RPeEh2eA17J9oodAZDUejkhOZodIR7HA5C3k2GRLL2pXyqaCGxM0Iyyydy4c0weYWkZBETDo9ofGK8xzSOKKpKs00JhdqvGmA"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </CartProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>
);
