import multer, { diskStorage } from "multer";

const ALLOWED_EXT = ["jpg", "png", "JPG", "PNG", "jpeg", "JPEG"];
const MAX_SIZE = 5 * 1024 * 1024;

const fileFilterOption = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  const fileSize = parseInt(req.headers["content-length"]);

  if (!ALLOWED_EXT.includes(ext)) {
    req.errorValidateFile = `Hanya boleh image dengan format: ${ALLOWED_EXT}`;
    return cb(null, false);
  }

  if (fileSize > MAX_SIZE) {
    req.errorValidateFile = `File terlalu besar maksimal ukuran file 5 mb`;
    return cb(null, false);
  }

  cb(null, true);
};

export const uploadUser = multer({
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const configSuffix = Math.round(Math.random() * 1e9);
      const ext = file.originalname.split(".").pop();
      cb(null, "users" + configSuffix + "." + ext);
    },
  }),
  fileFilter: fileFilterOption,
});
