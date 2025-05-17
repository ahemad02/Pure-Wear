import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import UserSidebar from "../common/UserSidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { userToken, apiUrl } from "../common/http";
import Loader from "../common/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
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
          if (result.status == 200) {
            setLoading(false);
            console.log(result);
            reset({
              name: result.data.name,
              email: result.data.email,
              mobile: result.data.mobile,
              address: result.data.address,
              city: result.data.city,
              state: result.data.state,
              zip: result.data.zip,
            });
          } else {
            toast.error(result.message);
          }
        });
    },
  });

  const updateAccount = (data) => {
    fetch(`${apiUrl}/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success(result.message);
        } else {
          const formErros = result.errors;
          Object.keys(formErros).forEach((key) => {
            setError(key, {
              message: formErros[key][0],
            });
          });
        }
      });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">My Profile</h4>
            {/* <Link to="" className="btn btn-primary">
              Button
            </Link> */}
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            {loading && <Loader />}
            {!loading && (
              <form onSubmit={handleSubmit(updateAccount)}>
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          {...register("name", {
                            required: "The name field is required",
                          })}
                          id="name"
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Name"
                        />
                        {errors.name && (
                          <span className="text-danger">
                            {errors.name.message}
                          </span>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: "The email field is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          type="email"
                          id="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Email"
                        />
                        {errors.email && (
                          <span className="text-danger">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          {...register("address", {
                            required: "The address field is required",
                          })}
                          name="address"
                          id="address"
                          placeholder="Enter Address"
                          className={`form-control ${
                            errors.address ? "is-invalid" : ""
                          }`}
                        ></textarea>
                        {errors.address && (
                          <span className="text-danger">
                            {errors.address.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="mobile" className="form-label">
                          Mobile
                        </label>
                        <input
                          {...register("mobile", {
                            required: "The mobile field is required",
                          })}
                          id="mobile"
                          type="text"
                          className={`form-control ${
                            errors.mobile ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Mobile Number"
                        />
                        {errors.mobile && (
                          <span className="text-danger">
                            {errors.mobile.message}
                          </span>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          {...register("city", {
                            required: "The city field is required",
                          })}
                          type="text"
                          id="city"
                          className={`form-control ${
                            errors.city ? "is-invalid" : ""
                          }`}
                          placeholder="Enter City"
                        />
                        {errors.city && (
                          <span className="text-danger">
                            {errors.city.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <input
                          {...register("state", {
                            required: "The state field is required",
                          })}
                          id="state"
                          type="text"
                          className={`form-control ${
                            errors.state ? "is-invalid" : ""
                          }`}
                          placeholder="Enter State"
                        />
                        {errors.state && (
                          <span className="text-danger">
                            {errors.state.message}
                          </span>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          {...register("zip", {
                            required: "The zip field is required",
                          })}
                          type="text"
                          id="zip"
                          className={`form-control ${
                            errors.zip ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Zip"
                        />
                        {errors.zip && (
                          <span className="text-danger">
                            {errors.zip.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary mt-4 mb-5">Update</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
