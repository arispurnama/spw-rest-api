import db from "../config/Database.js"
import { Sequelize } from "sequelize"
import ProdukSiswa from "../model/ProdukSiswa.js"

const { QueryTypes } = Sequelize;

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
