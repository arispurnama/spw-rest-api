import Roles from "../model/Role.js";
import Sequelize from "sequelize";
import db from "../config/Database.js"

const { QueryTypes } = Sequelize;

export const getListRoles = async (req, res) => {
    const responsePagination = new Object();    
    try {
        const response = await db.query('SELECT "id", "name", "createdAt", "updatedAt" FROM "TB_MD_ROLE" AS "TB_MD_ROLE";',{
            type: QueryTypes.SELECT,
        })
        responsePagination.page = 1;
        responsePagination.size = 10;
        responsePagination.total = 88;
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

export const getRoles = async (req, res) => {
    try {
        const response = await Roles.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const getRoleById = async (req, res) => {
    try {
        const response = await Roles.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createRole = async (req, res) => {
    try {
        await Roles.create(req.body);
        res.status(201).json({ msg: "Roles Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateRole = async (req, res) => {
    try {
        await Roles.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Roles Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteRole = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Roles Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}