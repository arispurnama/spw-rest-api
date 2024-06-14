import { promisify } from "util";
import multer, { diskStorage } from "multer";
const maxSize = 5 * 1024 * 1024;
import fs from "fs";
import { v4 } from "uuid";
let file_name = '';
const uploadDir = "D:\\Tugas Akhir\\Project\\FullStack-1\\frontend\\my-app\\public\\uploads";
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
    let files = file.originalname; 
    let fileNameSPlit = file.originalname.split(' ');
    let valueSplit ='';
    fileNameSPlit.forEach(element => {
      valueSplit += `-${element}`;
    });

    const newFileName = v4() + "-" + valueSplit; 
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

// Function to delete file in the directory
export const deleteFile = (filename) => {
  let filePath = `${uploadDir}\\${filename}`;
  console.log('dele file ', filePath);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
};