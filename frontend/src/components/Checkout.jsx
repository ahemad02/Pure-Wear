import React, { useContext, useState } from "react";
import Layout from "./common/Layout";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "./common/http";
import { toast } from "react-toastify";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartData, subTotal, grandTotal, shipping } = useContext(CartContext);

  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      fetch(`${apiUrl}/get-account-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          reset({
            name: result.data.name,
            email: result.data.email,
            mobile: result.data.mobile,
            address: result.data.address,
            city: result.data.city,
            state: result.data.state,
            zip: result.data.zip,
          });
        });
    },
  });

  const navigate = useNavigate();

  const processOrder = async (data) => {
    if (paymentMethod === "cod") {
      saveOrder(data, "unpaid");
    } else if (paymentMethod === "stripe") {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      // Call your backend to create a PaymentIntent
      const response = await fetch(`${apiUrl}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
        body: JSON.stringify({ amount: grandTotal() * 100 }), // amount in cents
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        toast.error("Server error. Check backend logs.");
        return;
      }

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        toast.error("Stripe client secret not received.");
        return;
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          saveOrder(data, "paid");
        }
      }
    }
  };

  const saveOrder = async (formData, status) => {
    const newData = {
      ...formData,
      grand_total: grandTotal(),
      subtotal: subTotal(),
      shipping: shipping(),
      discount: 0,
      payment_status: status,
      status: "pending",
      cart: JSON.stringify(cartData),
    };
    await fetch(`${apiUrl}/save-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          localStorage.removeItem("cart");
          navigate(`/order/confirmation/${result.id}`);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <form onSubmit={handleSubmit(processOrder)}>
          <div className="row">
            <div className="col-md-7">
              <h3 className="border-bottom pb-3">
                <strong>Billing Details</strong>
              </h3>

              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("name", {
                        required: "The name field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("email", {
                        required: "The email field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="invalid-feedback">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    {...register("address", {
                      required: "The address field is required",
                    })}
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    placeholder="Address"
                    rows={3}
                  ></textarea>
                  {errors.address && (
                    <p className="invalid-feedback">{errors.address.message}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("city", {
                        required: "The city field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.city ? "is-invalid" : ""
                      }`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="invalid-feedback">{errors.city.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("state", {
                        required: "The state field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.state ? "is-invalid" : ""
                      }`}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="invalid-feedback">{errors.state.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("zip", {
                        required: "The zip field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.zip ? "is-invalid" : ""
                      }`}
                      placeholder="Zip"
                    />
                    {errors.zip && (
                      <p className="invalid-feedback">{errors.zip.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("mobile", {
                        required: "The mobile field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                      placeholder="Mobile"
                    />
                    {errors.mobile && (
                      <p className="invalid-feedback">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <h3 className="border-bottom pb-3">
                <strong>Items</strong>
              </h3>
              <table className="table">
                <tbody>
                  {cartData &&
                    cartData.map((item) => (
                      <tr key={item.id}>
                        <td width={100}>
                          <img src={item.image_url} alt="" width={80} />
                        </td>

                        <td width={600}>
                          <h4>{item.title}</h4>
                          <div className="d-flex align-items-center pt-3">
                            <span> ${item.price} </span>
                            <div className="ps-3">
                              {item.size && (
                                <button className="btn btn-size">
                                  {item.size}
                                </button>
                              )}
                            </div>
                            <div className="ps-5">{item.qty}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <div>Subtotal</div>
                    <div>${subTotal()}</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>Shipping</div>
                    <div>${shipping()}</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>
                      <strong>Grand Total</strong>
                    </div>
                    <div>${grandTotal()}</div>
                  </div>
                </div>
              </div>
              <h3 className="border-bottom pt-4 pb-3">
                <strong>Payment Method</strong>
              </h3>
              <div className="pt-2">
                <input
                  name="payment_method"
                  type="radio"
                  onClick={handlePaymentMethod}
                  defaultChecked={paymentMethod == "stripe"}
                  value={"stripe"}
                />
                <label htmlFor="" className="form-label ps-2">
                  Stripe
                </label>
                <input
                  name="payment_method"
                  type="radio"
                  onClick={handlePaymentMethod}
                  defaultChecked={paymentMethod == "cod"}
                  value={"cod"}
                  className="ms-3"
                />
                <label htmlFor="" className="form-label ps-2">
                  COD
                </label>
              </div>
              <div className="d-flex py-3">
                <button className="btn btn-primary">Pay Now</button>
              </div>

              {paymentMethod === "stripe" && (
                <div className="pt-3">
                  <label>Card Info</label>
                  <div className="form-control">
                    <CardElement />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
