import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaksi, getUser } from "../Actions/actions";
import Bayar from "./bayar";

const Transaksi = () => {
  const {
    getUserResult,
    getTransaksiResult,
    getTransaksiLoading,
    getTransaksiError,
  } = useSelector((state) => state.UserReducer);

  const getDataSession = () => {
    const keyString = sessionStorage.getItem("userdata");
    return JSON.parse(keyString);
  };
  const data = getDataSession() ? getDataSession() : false;

  const dispatch = useDispatch();

  const [transaksi, setTransaksi] = useState({
    transaksi_id: "",
    transaksi_name: "",
    transaksi_harga: "",
    user_id: "",
    username: "",
    user_saldo: "",
  });

  const showBayar = (
    transaksi_id,
    transaksi_name,
    transaksi_harga,
    user_id,
    username,
    user_saldo
  ) => {
    setTransaksi({
      transaksi_id: transaksi_id,
      transaksi_name: transaksi_name,
      transaksi_harga: transaksi_harga,
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
    dispatch(getTransaksi());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div>
      <h1 className="card-header border border-warning text-white text-center bg-dark">
        Transaction
      </h1>

      <div class="justify-content-evenly">
        <h2>
          {getUserResult ? getUserResult.username : <p>Tidak Ada Data</p>}
        </h2>
      </div>
      <div class="justify-content-evenly">
        <h5>Saldo </h5>
      </div>
      <div class="justify-content-evenly">
        <h5>
          {getUserResult ? (
            formatRupiah(getUserResult.user_saldo)
          ) : (
            <p>Tidak Ada Data</p>
          )}
        </h5>
      </div>
      <table className="table table-striped table-hover align-middle left-justify">
        <thead>
          <tr>
            <th>Id</th>
            <th>Transaksi</th>
            <th>Harga</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getTransaksiResult ? (
            getTransaksiResult.map((transaksi) => {
              const { transaksi_id, transaksi_name, transaksi_harga } =
                transaksi;
              return (
                <tr key={transaksi_id}>
                  <td>{transaksi_id}</td>
                  <td>{transaksi_name}</td>
                  <td>{formatRupiah(transaksi_harga)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn ms-3 btn-warning text-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#addModal"
                      onClick={() => {
                        showBayar(
                          transaksi_id,
                          transaksi_name,
                          transaksi_harga,
                          getUserResult.user_id,
                          getUserResult.username,
                          getUserResult.user_saldo
                        );
                      }}
                    >
                      Beli
                    </button>
                  </td>
                </tr>
              );
            })
          ) : getTransaksiLoading ? (
            <p>Loading . . .</p>
          ) : (
            <p>{getTransaksiError ? getTransaksiError : "Data Kosong"}</p>
          )}
        </tbody>
      </table>
      <Bayar transaksi={transaksi} setTransaksi={setTransaksi} />
    </div>
  );
};

export default Transaksi;
