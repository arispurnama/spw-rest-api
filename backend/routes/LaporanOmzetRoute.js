import express from "express"
import { createLaporanOmzet, deleteLaporanOmzet, updateLaporanOmzet, getLaporanOmzetById } from "../controller/LaporanOmzetController.js";

const route = express.Router();

route.post("/laporan-omzet", createLaporanOmzet);
route.patch('/laporan-omzet/:id', updateLaporanOmzet);
route.delete('/laporan-omzet/:id', deleteLaporanOmzet);
route.get('/laporan-omzet/:id', getLaporanOmzetById);

export default route;