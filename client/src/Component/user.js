import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Actions/actions";
import TopUp from "./topUp";

const User = () => {
  const getDataSession = () => {
    const keyString = sessionStorage.getItem("userdata");
    return JSON.parse(keyString);
  };
  const data = getDataSession() ? getDataSession() : false;
  const { getUserResult } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    user_id: "",
    username: "",
    user_saldo: "",
  });

  const showTopUp = (user_id, username, user_saldo) => {
    setUser({
      user_id: user_id,
      username: username,
      user_saldo: user_saldo,
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    dispatch(getUser(data.data.user_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className="container mt-4">
      <div className="card ">
        <div className="card-header border border-warning text-white text-center bg-dark">
          <h1>Account</h1>
        </div>
        <div className="card-header border border-warning">
          <img src={getUserResult.image} className="card-img-top" alt="..." />
        </div>
        <div className="card-body">
          <div class="row justify-content-evenly">
            <div class="col-4">
              <h2>Username :</h2>
            </div>
            <div class="col-4">
              <h3>
                {getUserResult ? getUserResult.username : <p>Tidak Ada Data</p>}
              </h3>
            </div>
          </div>
          <div class="row justify-content-evenly">
            <div class="col-4">
              <h2>Saldo :</h2>
            </div>
            <div class="col-4">
              <h3>
                {getUserResult ? (
                  formatRupiah(getUserResult.user_saldo)
                ) : (
                  <p>Tidak Ada Data</p>
                )}
              </h3>
            </div>
          </div>
          <button
            type="button"
            className="btn ms-3 btn-warning text-dark"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
            onClick={() => {
              showTopUp(
                getUserResult.user_id,
                getUserResult.username,
                getUserResult.user_saldo
              );
            }}
          >
            Top Up
          </button>
        </div>
      </div>
      <TopUp user={user} setUser={setUser} />
    </div>
  );
};

export default User;
