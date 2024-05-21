import express from "express"
import { createLaporanOmzet, deleteLaporanOmzet, updateLaporanOmzet, getLaporanOmzetById } from "../controller/LaporanOmzetController.js";
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

route.post("/laporan-omzet", verifyToken ,createLaporanOmzet);
route.patch('/laporan-omzet/:id', verifyToken ,updateLaporanOmzet);
route.delete('/laporan-omzet/:id', verifyToken ,deleteLaporanOmzet);
route.get('/laporan-omzet/:id', verifyToken ,getLaporanOmzetById);

export default route;