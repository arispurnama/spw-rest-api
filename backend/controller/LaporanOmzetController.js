import Sequelize, { DATE } from "sequelize";
import db from "../config/Database.js"
import LaporanOmzet from "../model/Laporan.js";
import { PaginationHelper, QueryHelper } from "../Helper/QueryHalper.js";

const { QueryTypes } = Sequelize;

export const getListLaporanOmzet = async (req, res) => {
    const responsePagination = new Object();
    try {
        let page = req.query.page;
        let size = req.query.size;
        let search = req.query.search;
        let searchColumn = 'tl.id, tl."userId", tl."tanggalLaporan", tl."jumlahOmzet", tl."JumlahModal", tl."buktiTransaksi", tl.keterangan, tl."createdAt", tl."updatedAt", tl."deletedAt", tl."isDeleted", tmu."firstName", tmu."lastName"';
        let query = 'SELECT count(*) over () TOTALDATA, tl.id, tl."userId", tl."tanggalLaporan", tl."jumlahOmzet", tl."JumlahModal", tl."buktiTransaksi", tl.keterangan, tl."createdAt", tl."updatedAt", tl."deletedAt", tl."isDeleted", tmu."firstName", tmu."lastName" FROM public."TB_TR_LAPORAN" tl inner join public."TB_MD_USER" tmu on tl."userId" = tmu.id where tl."isDeleted" = false and tmu."isDeleted" = false ';
        let paggination = PaginationHelper(page, size);
        let  queryString = QueryHelper(query, "", search, searchColumn,"",paggination, "");
        const response = await db.query(queryString, {
            type: QueryTypes.SELECT,
        })

        
        let  queryStringCount = QueryHelper(query, "", search, searchColumn, "", "", "");
        const total = await db.query(queryStringCount, {
            type: QueryTypes.SELECT,
        })
        let totalData = 0;
        if(total.length > 0){
            totalData =total[0].totaldata;
        }
        responsePagination.page = (page);
        responsePagination.size = parseInt(size);
        responsePagination.total = parseInt(totalData);
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

export const createLaporanOmzet = async (req, res) => {
    const response = new Object();
    try {
        let payload = req.body;
        payload.createdAt = new Date().toDateString();
        payload.updatedAt = new Date().toDateString();
        const result = await LaporanOmzet.create(payload);
        response.data = result;
        response.error = false;
        response.errorMessage = "Sukses";
        res.status(201).json({ response });
    } catch (error) {
        response.error = true;
        response.errorMessage = error.message;
        res.status(500).json({ response });
    }
}
export const updateLaporanOmzet = async (req, res) => {
    try {
        await LaporanOmzet.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Laporan Omzet Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteLaporanOmzet = async (req, res) => {
    try {
        await LaporanOmzet.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Laporan Omzet Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}
export const getLaporanOmzetById = async (req, res) => {
    try {
        const response = await LaporanOmzet.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
