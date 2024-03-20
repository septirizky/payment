import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RegisterUsers } from "../Actions/actions";

export const Register = () => {
  const { registerResult, registerError } = useSelector(
    (state) => state.UserReducer
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Swal.fire({
      title: "Apakah data sudah sesuai?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "orange",
    }).then((result) => {
      if (result.isConfirmed) {
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("image", image);
        setIsRegister(true);
        dispatch(RegisterUsers(formData));
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
                navigate(-1);
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
              navigate("/login");
            }}
            className="btn btn-warning pb-2"
          >
            Login
          </button>
        </div>
        <div className="card-body">
          <div className="w-100" style={{ padding: "100px" }}>
            <h2 className="w-100 text-center text-white mb-2">
              Register Account
            </h2>
            <form
              className="w-100 text-center text-white mb-2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="d-flex align-items-center justify-content-center w-100">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control mb-2"
                  name="username"
                  placeholder="username"
                  minLength="6"
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-center w-100">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-2"
                  name="email"
                  placeholder="email"
                  minLength="6"
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-center w-100">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-2"
                  name="password"
                  placeholder="password"
                  minLength="8"
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-center w-100">
                <input
                  type="file"
                  id="file"
                  className="form-control mb-2"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
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
