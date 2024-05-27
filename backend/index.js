import express from "express";
import cors from "cors";
import roleRoute from "./routes/RoleRoute.js";
import userRoute from "./routes/UserRoute.js"
import laporanOmzetRoute from "./routes/LaporanOmzetRoute.js"
import produkSiswaRoute from "./routes/ProdukSiswaRoute.js"
import galeriBeritaRoute from "./routes/GaleriBeritaRoute.js"
import UploadDownloadRoute from "./routes/UploadDownloadRoute.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(roleRoute);
app.use(userRoute);
app.use(laporanOmzetRoute);
app.use(produkSiswaRoute);
app.use(galeriBeritaRoute);
app.use(UploadDownloadRoute);

app.listen(3030, () => console.log('Server up and running.......'))