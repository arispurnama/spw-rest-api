import express from "express"
import {createProdukSiswa, deleteProdukSiswa, getProdukSiswaById, updateProdukSiswa} from "../controller/ProdukSiswaController.js"

const route = express.Router();

route.post('/produk-siswa', createProdukSiswa);
route.patch('/produk-siswa/:id', updateProdukSiswa);
route.delete('/produk-siswa/:id', deleteProdukSiswa);
route.get('/produk-siswa/:id', getProdukSiswaById);

export default route;