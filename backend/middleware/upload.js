import { promisify } from "util";
import multer, { diskStorage } from "multer";
const maxSize = 5 * 1024 * 1024;
import fs from "fs";
import { v4 } from "uuid";
let file_name = '';
const uploadDir = "D:\\Tugas Akhir\\uploads";
export const setFileName = (name) => {
  file_name = name;
}
export const getFileName = () =>{
  const name = file_name;
  return name;
}

// Function to create directory if it doesn't exist
const createDirectory = (dir) => {
  console.log(dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

let storage = diskStorage({
  destination: (req, file, cb) => {
    createDirectory(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    //console.log(v4() + file.originalname);
    const newFileName = v4() + "-" + file.originalname; 
    setFileName(newFileName)
    cb(null, newFileName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = promisify(uploadFile);
export default uploadFileMiddleware;
