import models from "../model/init-models.js";

export const getAllTransaksi = async (req, res) => {
  try {
    const result = await models.transaksi.findAll();
    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan Transaksi" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createTransaksi = async (req, res) => {
  try {
    const {
      transaksi_name,
      transaksi_harga,
      transaksi_bank_id,
      transaksi_user_id,
    } = req.body;

    const result = await models.transaksi.create({
      transaksi_name: transaksi_name,
      transaksi_harga: transaksi_harga,
      transaksi_bank_id: transaksi_bank_id,
      transaksi_user_id: transaksi_user_id,
    });
    return res
      .status(200)
      .json({ data: result, message: "Transaksi berhasil ditambahkan" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const transfer = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_saldo, transaksi_harga } = req.body;

    if (+user_saldo < +transaksi_harga) {
      return res
        .status(500)
        .json({ message: "Maaf Saldo Anda Kurang, Silahkan melakukan top up" });
    } else {
      const newUserSaldo = +user_saldo - +transaksi_harga;
      const result = await models.users.update(
        {
          user_saldo: newUserSaldo,
        },
        {
          where: { user_id: user_id },
          returning: true,
        }
      );

      return res
        .status(200)
        .json({ data: result, message: "Berhasil melakukan pembayaran" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
