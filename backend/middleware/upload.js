import { promisify } from "util";
import multer, { diskStorage } from "multer";
const maxSize = 5 * 1024 * 1024;
import fs from "fs"

const uploadDir = "D:\\Tugas Akhir\\uploads";
// Function to create directory if it doesn't exist
const createDirectory = (dir) => {
    console.log(dir)
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  };
let storage = diskStorage({
  destination: (req, file, cb) => {
    createDirectory(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, Date.now() +  file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = promisify(uploadFile);
export default uploadFileMiddleware;
