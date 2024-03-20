import bcrypt from "bcrypt";
import models from "../model/init-models.js";
import jwt from "jsonwebtoken";
import validator from "validator";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkUsername = await models.users.findOne({
      where: {
        username: username,
      },
    });

    if (checkUsername) {
      return res.status(400).json({
        message: `Username ${username} sudah ada, harap masukkan username lain`,
      });
    }
    let image = req.file;
    if (!image) {
      image = "uploads\\noavatar.png";
    } else {
      image = image.path;
    }

    const salt = bcrypt.genSaltSync(10);
    const passhash = bcrypt.hashSync(password, salt);

    if (password.length < 8) {
      return res.status(402).json({ message: "Password minimal 8 karakter" });
    } else if (validator.isEmail(email)) {
      const result = await models.users.create({
        username: username,
        email: email,
        password: passhash,
        user_saldo: 0,
        image: image,
      });
      return res
        .status(200)
        .json({ data: result, message: "Berhasil membuat akun" });
    } else {
      return res.status(402).json({ message: "Email tidak sesuai format" });
    }
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(402).json("Email tidak ditemukan!");
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
          expiresIn: "12h",
        });
        res
          .status(200)
          .json({ data: user, token: token, message: "Berhasil login" });
      } else {
        res.status(400).json("Password Salah!");
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await models.users.findOne({
      where: { user_id: user_id },
    });
    res.status(200).json({ data: result, message: "Berhasil mendapat user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const topUp = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { bank_id, saldo, user_saldo, bank_saldo } = req.body;

    if (+saldo > +bank_saldo) {
      return res.status(500).json({ message: "Maaf Saldo Anda Kurang" });
    } else {
      const newBankSaldo = +bank_saldo - +saldo;
      const newUserSaldo = +user_saldo + +saldo;

      const bank = await models.bank.update(
        {
          bank_saldo: newBankSaldo,
        },
        { where: { bank_id: bank_id }, returning: true }
      );

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
        .json({ data: result, message: "Bserhasil top up" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
