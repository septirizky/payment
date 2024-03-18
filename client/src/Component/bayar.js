/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getTransaksi, transfer } from "../Actions/actions";

const Bayar = (props) => {
  const { transaksi, setTransaksi } = props;

  const { bayarResult, bayarError } = useSelector((state) => state.UserReducer);

  const [isBayar, setIsBayar] = useState(false);

  const dispatch = useDispatch();

  const handleBayar = () => {
    const data = {
      transaksi_id: transaksi.transaksi_id,
      transaksi_harga: transaksi.transaksi_harga,
      user_id: transaksi.user_id,
      user_saldo: transaksi.user_saldo,
    };
    Swal.fire({
      title: "Apakah anda yakin akan melakukan pembayaran ini?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EBAB2D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bayar",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsBayar(true);
        dispatch(transfer(data));
      }
    });
  };

  useEffect(() => {
    if (isBayar) {
      if (bayarResult) {
        Swal.fire({
          title: bayarResult,
          text: "",
          icon: "success",
        }).then(() => {
          setTransaksi("");

          dispatch(getTransaksi());
        });
      } else if (bayarError) {
        Swal.fire({
          title: bayarError,
          text: "Gagal Melakukan Transfer!",
          icon: "error",
        });
      }
    }

    dispatch(getTransaksi());
    // eslint-disable-next-line
  }, [bayarResult, bayarError]);

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
                value={transaksi.username}
                onChange={(e) =>
                  setTransaksi({ ...transaksi, username: e.target.value })
                }
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating m-3">
              <input
                type="text"
                id="formSaldo"
                className="form-control text-dark"
                value={transaksi.user_saldo}
                onChange={(e) =>
                  setTransaksi({ ...transaksi, user_saldo: e.target.value })
                }
                required
              />
              <label htmlFor="saldo">Saldo</label>
            </div>
            <div className="form-floating m-3">
              <input
                type="text"
                id="formHarga"
                className="form-control text-dark"
                value={transaksi.transaksi_harga}
                onChange={(e) =>
                  setTransaksi({
                    ...transaksi,
                    transaksi_harga: e.target.value,
                  })
                }
                required
              />
              <label htmlFor="username">Harga</label>
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
              onClick={handleBayar}
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
export default Bayar;
