import db from "../config/Database.js"
import { Sequelize } from "sequelize"
import GaleriBerita from "../model/GaleriBerita.js"

const {QueryTypes} = Sequelize;

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
