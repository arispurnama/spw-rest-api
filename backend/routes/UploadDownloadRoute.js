import express from "express"
import { download, getListFiles, upload } from "../controller/UploadDownlaodController.js";
const route = express.Router();

route.post('/upload', upload);
route.get('/download-file', getListFiles);
route.get('/download/:name', download);

export default route;