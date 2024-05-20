import Express from "express"
import { createGaleriBerita, deletedGaleriBerita, getGaleriBeriataById, updateGaleriBerita } from "../controller/GaleriBeritaController.js";


const route = Express.Router();

route.post('/galeri-berita', createGaleriBerita);
route.patch('/galeri-berita/:id', updateGaleriBerita);
route.delete('/galeri-berita/:id', deletedGaleriBerita);
route.get('/galeri-berita/:id', getGaleriBeriataById);

export default route;