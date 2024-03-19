import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { LoginUsers } from "../Actions/actions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState("");

  const { loginResult, loginError } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDataSession = () => {
    const keyString = sessionStorage.getItem("userdata");
    return JSON.parse(keyString);
  };
  const data = getDataSession() ? getDataSession() : false;

  const login = (event) => {
    event.preventDefault();
    setIsLogin(true);
    dispatch(LoginUsers({ email: email, password: password }));
  };

  useEffect(() => {
    if (data) {
      let timerInterval;
      isLogin
        ? loginResult.data
          ? Swal.fire({
              title: "Login Success",
              html: "Mohon tunggu",
              timer: 2500,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              if (result.dismiss) {
                navigate("/");
              }
            })
          : Swal.fire("Login Failed", loginError, "error")
        : navigate("/login");
    }
    if (loginError) {
      Swal.fire("Login Failed", loginError, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResult, loginError]);
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card w-75 border border-warning bg-secondary">
        <div className="card-body m-0 p-0">
          <div className="row m-0 p-0">
            <div
              className="col-sm-8 my-5 "
              style={{ paddingBottom: "150px", paddingTop: "150px" }}
            >
              <h1 className="text-center text-white mb-4">Login Account</h1>
              <form onSubmit={(event) => login(event)}>
                <div className="d-flex align-items-center justify-content-center w-100">
                  <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-control mb-2 w-50"
                    name="email"
                    placeholder="email"
                    required
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center w-100">
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-control mb-2 w-50"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center w-100 ">
                  <button
                    type="submit"
                    className="btn btn-primary mb-2 w-25 bg-warning"
                    name="submit"
                    placeholder="Password"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div
              className="col-sm-4 text-white bg-dark"
              style={{
                paddingBottom: "150px",
                paddingTop: "220px",
              }}
            >
              <div className="d-flex align-items-center justify-content-center w-100">
                <h2 className="">New Here?</h2>
              </div>
              <div className="d-flex align-items-center justify-content-center w-100">
                <p className="w-100 text-center">
                  Sign Up and share your experience, hobby, bussiness, and many
                  things with others
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-center w-100">
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="btn btn-primary mb-2 w-50 bg-warning"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
