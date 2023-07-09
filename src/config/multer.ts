import multer from "multer";
import { extname } from "path";

const allowedMIMETypes = ["image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: "uploads",
  filename(req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      file.fieldname + "-" + uniqueSuffix + `.${extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, callback) {
    if (!allowedMIMETypes.includes(file.mimetype)) {
      callback(null, false);
    }
    callback(null, true);
  },
});

export default upload;
