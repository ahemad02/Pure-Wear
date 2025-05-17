import React, { useContext } from "react";
import Layout from "./common/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./common/http";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          const userInfo = {
            token: result.token,
            name: result.name,
            id: result.id,
          };

          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          login(userInfo);

          toast.success(result.message);
          navigate("/account/dashboard");
        } else {
          //   toast.error(result.message);
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((key) => {
            setError(key, {
              message: formErrors[key][0],
            });
          });
        }
      });
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h3 className="border-bottom pb-2 mb-3">Login</h3>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
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
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email?.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "The password field is required.",
                  })}
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password?.message}</p>
                )}
              </div>
              <button className="btn btn-secondary w-100">Login</button>
              <div className="d-flex justify-content-center pt-4 pb-2">
                Don't have an account? &nbsp;
                <Link className="text-primary" to="/account/register">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
