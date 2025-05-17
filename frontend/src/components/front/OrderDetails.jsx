import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import UserSidebar from "../common/UserSidebar";
import Loader from "../common/Loader";
import { useParams } from "react-router-dom";
import { apiUrl, userToken } from "../common/http";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const id = params.id;

  const fetchOrder = async () => {
    await fetch(`${apiUrl}/get-order-details/${id}  `, {
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
          console.log(result);

          setOrder(result.data);
          setItems(result.data.items);
          setLoader(false);
        } else {
          toast.error(result.message);
        }
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Order Details</h4>
            {/* <Link to="" className="btn btn-primary">
              Button
            </Link> */}
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow mb-5">
              <div className="card-body p-4">
                {loader == true && <Loader />}
                {loader == false && (
                  <div>
                    <div className="row">
                      <div className="col-md-4">
                        <h3>Order ID: #{order.id}</h3>
                        {order.status == "pending" && (
                          <span className="badge bg-warning">Pending</span>
                        )}
                        {order.status == "shipped" && (
                          <span className="badge bg-info">Shipped</span>
                        )}
                        {order.status == "delivered" && (
                          <span className="badge bg-success">Delivered</span>
                        )}
                        {order.status == "cancelled" && (
                          <span className="badge bg-danger">Cancelled</span>
                        )}
                      </div>
                      <div className="col-md-4">
                        <div className="text-secondary">Date</div>
                        <h4 className="pt-2">{order.created_at}</h4>
                      </div>
                      <div className="col-md-4">
                        <div className="text-secondary">Payment Status</div>
                        {order.payment_status == "paid" && (
                          <h4 className="pt-2">Paid</h4>
                        )}
                        {order.payment_status == "unpaid" && (
                          <h4 className="pt-2">Unpaid</h4>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="py-3">
                          <strong>{order.name}</strong>
                          <div>{order.email}</div>
                          <div>{order.mobile}</div>
                          <div>
                            {order.address}, {order.city}, {order.state},{" "}
                            {order.zip}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="text-secondary pt-3">
                          Payment Method
                        </div>
                        <p>COD</p>
                      </div>
                    </div>
                    <div className="row">
                      <h3 className="pb-2">
                        <strong>Items</strong>
                      </h3>
                      {items.map((item) => (
                        <div key={item.id} className="row justify-content-end">
                          <div className="col-lg-12">
                            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                              <div className="d-flex">
                                {item.product.image && (
                                  <img
                                    width="70"
                                    className="me-3"
                                    src={`${item.product.image_url}`}
                                    alt=""
                                  />
                                )}

                                <div className="d-flex flex-column">
                                  <div className="mb-2">
                                    <span>{item.name}</span>
                                  </div>
                                  <div>
                                    <button className="btn btn-size">
                                      {item.size}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div>X {item.qty}</div>
                                <div className="ps-3">{item.price}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="row justify-content-end">
                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                            <div>Subtotal</div>
                            <div>${order.subtotal}</div>
                          </div>
                          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                            <div>Shipping</div>
                            <div>${order.shipping}</div>
                          </div>
                          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                            <div>
                              <strong>Grand Total</strong>
                            </div>
                            <div>${order.grand_total}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
