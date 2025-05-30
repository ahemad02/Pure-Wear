import React, { useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Shipping = () => {
  const [disable, setDisable] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/get-shipping`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status == 200) {
            reset({
              shipping_charge: result.data.shipping_charge,
            });
          }
        });
    },
  });

  const saveShipping = async (data) => {
    setDisable(true);
    const res = await fetch(`${apiUrl}/save-shipping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json(data))
      .then((result) => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
  };
  return (
    <Layout img={"../../src/assets/images/logo.png"}>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Shipping</h4>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveShipping)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Shipping Charge
                    </label>
                    <input
                      {...register("shipping_charge", {
                        required: "The Shipping Charge is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.shipping_charge && "is-invalid"
                      }`}
                      placeholder="Shipping Charge"
                    />
                    {errors.shipping_charge && (
                      <p className="invalid-feedback">
                        {errors.shipping_charge.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
