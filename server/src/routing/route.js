import { Router } from "express";
import { getUser, login, register, topUp } from "../controllers/user.js";
import { createBank, getAllBank } from "../controllers/banks.js";
import {
  createTransaksi,
  getAllTransaksi,
  transfer,
} from "../controllers/transaksi.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:user_id", getUser);
router.put("/users/:user_id", topUp);

router.get("/bank", getAllBank);
router.post("/bank", createBank);

router.get("/transaksi", getAllTransaksi);
router.post("/transaksi", createTransaksi);
router.put("/transaksi/:user_id", transfer);
export default router;
