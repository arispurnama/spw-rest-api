import Express from "express"
import { createGaleriBerita, deletedGaleriBerita, getGaleriBeriataById, getListGaleriBerita, updateGaleriBerita } from "../controller/GaleriBeritaController.js";
import { verifyToken } from "../middleware/auth.js";


const route = Express.Router();

route.post('/galeri-berita', verifyToken , createGaleriBerita);
route.patch('/galeri-berita/:id', verifyToken ,updateGaleriBerita);
route.delete('/galeri-berita/:id', verifyToken ,deletedGaleriBerita);
route.get('/galeri-berita/:id', verifyToken ,getGaleriBeriataById);
route.get('/galeri-berita', verifyToken, getListGaleriBerita);
export default route;