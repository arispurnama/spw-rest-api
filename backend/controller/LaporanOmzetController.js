import Sequelize from "sequelize";
import db from "../config/Database.js"
import LaporanOmzet from "../model/Laporan.js";

const { QueryTypes } = Sequelize;

export const createLaporanOmzet = async (req, res) => {
    try {
        await LaporanOmzet.create(req.body);
        res.status(201).json({ msg: "Laporan Omzet Created" });
    } catch (error) {
        console.log(error.message);
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
