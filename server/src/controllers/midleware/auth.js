import jwt from "jsonwebtoken";

export const accesValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      if (jwt.verify(await token, process.env.SECRET_KEY)) {
        next();
      } else {
        res.status(401).json({
          message: `Maaf anda tidak memiliki Token`,
        });
      }
    } else {
      res.status(404).json({
        message: "Anda Belum Melakukan Login, Silahkan Login Terlebih Dahulu",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
