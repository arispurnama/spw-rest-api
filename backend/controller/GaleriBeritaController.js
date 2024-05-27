import db from "../config/Database.js"
import { Sequelize } from "sequelize"
import GaleriBerita from "../model/GaleriBerita.js"

const {QueryTypes} = Sequelize;

export const getListGaleriBerita = async (req, res) => {
    const responsePagination = new Object();
    try {
        let page = req.query.page;
        let size = req.query.size;
        let search = req.query.search;
        let searchColumn = 'gb.id, "userId", gb.tanggal, gb."fileName", gb.keterangan, gb."judulBerita", gb."createdAt", gb."updatedAt", gb."deletedAt", gb."isDeleted", tmu.id as userId, tmu."firstName", tmu."lastName"';
        let query = 'SELECT count(*) over () TOTALDATA, gb.id, "userId", gb.tanggal, gb."fileName", gb.keterangan, gb."judulBerita", gb."createdAt", gb."updatedAt", gb."deletedAt", gb."isDeleted", tmu.id as userId, tmu."firstName", tmu."lastName" FROM public."TB_TR_GALERI_BERITA" as gb inner join public."TB_MD_USER" tmu on gb."userId" = tmu.id where gb."isDeleted" = false and tmu."isDeleted" = false ';
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

export const createGaleriBerita = async (req, res) => {
    try {
        await GaleriBerita.create(req.body);
        res.status(201).json({ msg: "Galeri Berita Created" });
    } catch (error) {
        console.log(error.message);
    }
}
export const updateGaleriBerita = async (req, res) => {
    try {
        await GaleriBerita.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Galeri Berita Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletedGaleriBerita = async (req, res) => {
    try {
        await GaleriBerita.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Galeri Berita Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}
export const getGaleriBeriataById = async (req, res) => {
    try {
        const response = await GaleriBerita.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
