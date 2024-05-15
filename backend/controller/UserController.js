import Users from "../model/Users.js";
import Sequelize from "sequelize";
import db from "../config/Database.js"

export const getListUsers = async (req, res) => {
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