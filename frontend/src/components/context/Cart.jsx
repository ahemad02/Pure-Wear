import { useEffect, useState } from "react";
import { createContext } from "react";
import { apiUrl, userToken } from "../common/http";
import { set } from "react-hook-form";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [shippingCost, setShippingCost] = useState(0);

  const addToCart = (product, size = null) => {
    let updatedCart = [...cartData];

    if (cartData.length == 0) {
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
        product_id: product.id,
        size: size,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url,
      });
    } else {
      if (size != null) {
        const productIndex = updatedCart.findIndex(
          (item) => item.product_id === product.id && item.size === size
        );
        if (productIndex !== -1) {
          updatedCart[productIndex].qty += 1;
        } else {
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      } else {
        const productIndex = updatedCart.findIndex(
          (item) => item.product_id === product.id
        );
        if (productIndex !== -1) {
          updatedCart[productIndex].qty += 1;
        } else {
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      }
    }

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const shipping = () => {
    let shippingAmount = 0;
    cartData.map((item) => {
      shippingAmount = item.qty * shippingCost;
    });

    return shippingAmount;
  };

  const subTotal = () => {
    let subTotal = 0;
    cartData.map((item) => {
      subTotal += item.price * item.qty;
    });
    return subTotal;
  };

  const grandTotal = () => {
    return subTotal() + shipping();
  };

  const updateCartItem = (id, newQty) => {
    const updatedCart = cartData.map((item) => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getQty = () => {
    let qty = 0;
    cartData.map((item) => {
      qty += parseInt(item.qty);
    });
    return qty;
  };

  const fetchShipping = async () => {
    fetch(`${apiUrl}/get-shipping-front`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setShippingCost(result.data.shipping_charge);
        } else {
          toast.error(result.message);
          setShippingCost(0);
        }
      });
  };

  useEffect(() => {
    fetchShipping();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        shipping,
        subTotal,
        grandTotal,
        updateCartItem,
        removeFromCart,
        getQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
