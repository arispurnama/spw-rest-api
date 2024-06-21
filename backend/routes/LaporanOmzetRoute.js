import express from "express"
import { createLaporanOmzet, deleteLaporanOmzet, updateLaporanOmzet, getLaporanOmzetById, getListLaporanOmzet, getSequenceASCLaporan, getSummaryChartlaporan, approveLaporan, getSumModalAndOmzet, exportLaporan } from "../controller/LaporanOmzetController.js";
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

route.post("/laporan-omzet", verifyToken ,createLaporanOmzet);
route.patch('/laporan-omzet/:id', verifyToken ,updateLaporanOmzet);
route.delete('/laporan-omzet/:id', verifyToken ,deleteLaporanOmzet);
route.get('/laporan-omzet/:id', verifyToken ,getLaporanOmzetById);
route.get('/laporan-omzet', verifyToken, getListLaporanOmzet);
route.get('/summary-laporan-omzet', verifyToken, getSequenceASCLaporan);
route.get('/summary-chart-laporan-omzet', verifyToken,getSummaryChartlaporan);
route.patch('/approve-laporan/:id', verifyToken, approveLaporan);
route.get('/export-laporan', exportLaporan);

route.get('/total-modal-omzet/:userId', verifyToken, getSumModalAndOmzet);

export default route;