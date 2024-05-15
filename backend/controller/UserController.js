import Users from "../model/Users.js";
import Sequelize from "sequelize";
import db from "../config/Database.js"

const { QueryTypes } = Sequelize;

export const getListUsers = async (req, res) => {
    const responsePagination = new Object();    
    try {
        const response = await db.query('SELECT users."id", users."firstName", users."lastName", users."kelas", users."email", users."username", users."passsword", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id;',{
            type: QueryTypes.SELECT,
        })
        
        const total = await db.query('SELECT COUNT(users."id") FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id;',{
            type: QueryTypes.SELECT,
        })
        responsePagination.page = 1;
        responsePagination.size = 10;
        responsePagination.total = total[0].count;
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
export const createUsers = async (req, res) => {
    try {
        await Users.create(req.body);
        res.status(201).json({ msg: "Users Created" });
    } catch (error) {
        console.log(error.message);
    }
}