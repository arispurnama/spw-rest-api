import express from "express"
import {createProdukSiswa, deleteProdukSiswa, getProdukSiswaById, updateProdukSiswa} from "../controller/ProdukSiswaController.js"
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

route.post('/produk-siswa', verifyToken, createProdukSiswa);
route.patch('/produk-siswa/:id', verifyToken ,updateProdukSiswa);
route.delete('/produk-siswa/:id', verifyToken ,deleteProdukSiswa);
route.get('/produk-siswa/:id', verifyToken , getProdukSiswaById);

export default route;