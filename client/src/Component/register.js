import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { RegisterUsers } from "../Actions/actions";

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registerResult, registerError } = useSelector(
    (state) => state.UserReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const registerUsers = (data) => {
    Swal.fire({
      title: "Apakah data sudah sesuai?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "orange",
    }).then((result) => {
      if (result.isConfirmed) {
        const dataJson = {
          username: data.username,
          email: data.email,
          password: data.password,
        };
        setIsRegister(true);
        dispatch(RegisterUsers(dataJson));
      }
    });
  };
  useEffect(() => {
    if (registerResult || registerError) {
      if (isRegister) {
        registerResult
          ? Swal.fire({
              title: "Register Success",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Ok",
              confirmButtonColor: "orange",
            }).then(async (res) => {
              if (res.isConfirmed || res.isDismissed) {
                await navigate(-1);
              }
            })
          : Swal.fire("Gagal Register", registerError, "error");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerResult, registerError]);
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card w-75 bg-secondary border border-warning"
        style={{ border: "rgb(97,218,251) solid 1px" }}
      >
        <div
          className="card-header bg-dark border border-warning"
          style={{
            borderBottom: "rgb(97,218,251) solid 1px",
            backgroundColor: "rgb(97,218,251)",
          }}
        >
          <button
            onClick={() => {
              navigate("/");
            }}
            className="btn btn-light pb-2"
          >
            Login
          </button>
        </div>
        <div className="card-body">
          <div
            className="w-100"
            style={{ paddingBottom: "100px", paddingTop: "50px" }}
          >
            <h2 className="w-100 text-center text-white mb-2">
              Register Account
            </h2>
            <form onSubmit={handleSubmit(registerUsers)}>
              <input
                type="text"
                {...register("username")}
                className="form-control mb-2"
                name="username"
                placeholder="username"
                minLength="6"
                required
              />
              <input
                type="email"
                {...register("email")}
                className="form-control mb-2"
                name="email"
                placeholder="email"
                minLength="6"
                required
              />
              <input
                type="password"
                {...register("password")}
                className="form-control mb-2"
                name="password"
                placeholder="password"
                minLength="6"
                required
              />
              <button className="btn btn-primary w-100 bg-warning">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
