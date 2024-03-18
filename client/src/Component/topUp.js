/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getBank, getUser, topUp_Saldo } from "../Actions/actions";

const TopUp = (props) => {
  const { user, setUser } = props;

  const {
    getBankResult,
    getBankLoading,
    getBankError,
    topUpResult,
    topUpError,
  } = useSelector((state) => state.UserReducer);

  const [saldo, setsaldo] = useState("");
  const [saldoBank, setsaldoBank] = useState("");
  const [istopUp, setIsTopUp] = useState(false);

  const dispatch = useDispatch();

  const handleTopUp = () => {
    const data = {
      saldo: saldo,
      bank_id: saldoBank.split(",")[1],
      bank_saldo: saldoBank.split(",")[0],
      user_saldo: user.user_saldo,
    };
    const user_id = user.user_id;
    Swal.fire({
      title: "Apakah Kamu Yakin Ingin Melakukan Top Up?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EBAB2D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Top up",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsTopUp(true);
        dispatch(topUp_Saldo(data, user_id));
        dispatch(getUser(user_id));
      }
    });
  };

  useEffect(() => {
    if (istopUp) {
      if (topUpResult) {
        Swal.fire({
          title: " Berhasil Top Up",
          text: "",
          icon: "success",
        }).then(() => {
          setsaldo("");
          setsaldoBank("");
          setUser("");
          dispatch(getBank());
        });
      } else if (topUpError) {
        Swal.fire({
          title: topUpError,
          text: "Gagal melakukan top up!",
          icon: "error",
        });
      }
    }
    dispatch(getBank());
    // eslint-disable-next-line
  }, [topUpResult, topUpError]);

  return (
    <div
      className="modal fade"
      id="addModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Top Up
            </h5>
            <closeButton
              data-bs-dismiss="modal"
              aria-label="Close"
              color="#EBAB2D"
              size={26}
            />
          </div>

          <div className="modal-body">
            <div className="form-floating m-3">
              <input
                type="text"
                id="formUserName"
                className="form-control text-dark"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating m-3">
              <select
                className="form-select rounded-pill text-center"
                value={saldoBank}
                onChange={(e) => setsaldoBank(e.target.value)}
                required
              >
                <option value="">Pilih Bank</option>
                {getBankResult ? (
                  getBankResult.map((bank) => {
                    const { bank_id, bank_name, bank_saldo } = bank;
                    return (
                      <option key={bank_id} value={bank_saldo + "," + bank_id}>
                        {bank_name}
                      </option>
                    );
                  })
                ) : getBankLoading ? (
                  <option>{getBankLoading}</option>
                ) : (
                  <option>{getBankError ? getBankError : "data Kosong"}</option>
                )}
              </select>
              <label htmlFor="bank">Bank</label>
            </div>
            <div className="form-floating m-3">
              <input
                type="text"
                required
                value={saldo}
                id="saldo"
                className="form-control border-black"
                onChange={(e) => setsaldo(e.target.value)}
              />
              <label htmlFor="topup">Top Up</label>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleTopUp}
              data-bs-dismiss="modal"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopUp;
