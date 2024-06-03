import express from "express";
import {
  download,
  getListFiles,
  upload,
} from "../controller/UploadDownlaodController.js";
import { verifyToken } from "../middleware/auth.js";
const route = express.Router();

route.post("/upload", verifyToken,upload);
route.get("/download-file", getListFiles);
route.get("/download/:name", download);
route.get("/download-stream/:name", download);

export default route;
