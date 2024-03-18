import models from "../model/init-models.js";

export const getAllBank = async (req, res) => {
  try {
    const result = await models.bank.findAll();
    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan Bank" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createBank = async (req, res) => {
  try {
    const { bank_name, bank_saldo } = req.body;
    const result = await models.bank.create({
      bank_name: bank_name,
      bank_saldo: bank_saldo,
    });
    return res
      .status(200)
      .json({ data: result, message: "Bank berhasil ditambahkan" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
