import { Router } from "express";
import { getUser, login, register, topUp } from "../controllers/user.js";
import { createBank, getAllBank } from "../controllers/banks.js";
import {
  createTransaksi,
  getAllTransaksi,
  transfer,
} from "../controllers/transaksi.js";
import { accesValidation } from "../midleware/auth.js";
import { uploadUser } from "../midleware/multer.js";

const router = Router();

router.post("/register", uploadUser.single("image"), register);
router.post("/login", login);
router.get("/users/:user_id", accesValidation, getUser);
router.put("/users/:user_id", accesValidation, topUp);

router.get("/bank", accesValidation, getAllBank);
router.post("/bank", createBank);

router.get("/transaksi", accesValidation, getAllTransaksi);
router.post("/transaksi", createTransaksi);
router.put("/transaksi/:user_id", accesValidation, transfer);

export default router;
