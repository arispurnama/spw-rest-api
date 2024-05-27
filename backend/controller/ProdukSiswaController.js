import db from "../config/Database.js"
import { Sequelize } from "sequelize"
import ProdukSiswa from "../model/ProdukSiswa.js"

const { QueryTypes } = Sequelize;

export const getListProdukSiswa = async (req, res) => {
    const responsePagination = new Object();
    try {
        let page = req.query.page;
        let size = req.query.size;
        let search = req.query.search;
        let searchColumn = 'tps.id, tps."userId", tps."tanggalProduk", tps."namaProduk", tps.keterangan, tps."createdAt", tps."updatedAt", tps."deletedAt", tps."isDeleted", tmu."firstName", tmu."lastName"';
        let query = 'SELECT count(*) over () TOTALDATA, tps.id, tps."userId", tps."tanggalProduk", tps."namaProduk", tps.keterangan, tps."createdAt", tps."updatedAt", tps."deletedAt", tps."isDeleted", tmu."firstName", tmu."lastName" FROM public."TB_TR_PRODUK_SISWA" tps inner join public."TB_MD_USER" tmu on tps."userId" = tmu.id where tps."isDeleted" = false and tmu."isDeleted" = false ';
        let paggination = PaginationHelper(page, size);
        let  queryString = QueryHelper(query, "", search, searchColumn,"",paggination, "");
        const response = await db.query(queryString, {
            type: QueryTypes.SELECT,
        })

        
        let  queryStringCount = QueryHelper(query, "", search, searchColumn, "", "", "");
        const total = await db.query(queryStringCount, {
            type: QueryTypes.SELECT,
        })

        responsePagination.page = (page);
        responsePagination.size = parseInt(size);
        responsePagination.total = parseInt(total[0].totaldata);
        responsePagination.data = response;
        responsePagination.error = false;
        responsePagination.errorMessage = "Sukses";
        res.status(200).json(responsePagination);
    } catch (error) {
        responsePagination.error = true;
        responsePagination.errorMessage = error.message;
        console.log(error.message);
    }
}

export const createProdukSiswa = async (req, res) => {
    try {
        await ProdukSiswa.create(req.body);
        res.status(201).json({ msg: "Produk Siswa Created" });
    } catch (error) {
        console.log(error.message);
    }
}
export const updateProdukSiswa = async (req, res) => {
    try {
        await ProdukSiswa.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Produk Siswa Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProdukSiswa = async (req, res) => {
    try {
        await ProdukSiswa.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Produk Siswa Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}
export const getProdukSiswaById = async (req, res) => {
    try {
        const response = await ProdukSiswa.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
