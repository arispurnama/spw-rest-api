import express from "express"
import {createProdukSiswa, deleteProdukSiswa, getListProdukSiswa, getProdukSiswaById, updateProdukSiswa} from "../controller/ProdukSiswaController.js"
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

route.post('/produk-siswa', verifyToken, createProdukSiswa);
route.patch('/produk-siswa/:id', verifyToken ,updateProdukSiswa);
route.delete('/produk-siswa/:id', verifyToken ,deleteProdukSiswa);
route.get('/produk-siswa/:id', verifyToken , getProdukSiswaById);
route.get('/produk-siswa', verifyToken, getListProdukSiswa);

export default route;