import Users from "../model/Users.js";
import Sequelize from "sequelize";
import db from "../config/Database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { QueryString } from "../Helper/QueryHalper.js";

const { QueryTypes } = Sequelize;

export const getListUsers = async (req, res) => {
    const responsePagination = new Object();
    try {
        const response = await db.query('SELECT users."id", users."firstName", users."lastName", users."kelas", users."email", users."username", users."passsword", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id;', {
            type: QueryTypes.SELECT,
        })

        const total = await db.query('SELECT COUNT(users."id") FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id;', {
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
export const updateUsers = async (req, res) => {
    try {
        const userData = await Users.findOne({
            where: {
                id: req.params.id
            }
        });

        await Users.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Roles Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Roles Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}
export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const Registers = async (req, res) => {
    try {
        let user = req.body;
        let filter = "";
        let query = `SELECT users."id", users."firstName", users."lastName", users."kelas", users."email", users."username", users."passsword", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id where users."isDeleted" is null and users."deletedAt" is null`;

        if (user.username != "") {
            filter += ` and users."username" = '${req.body.username}' `;
        }

        let queryString = QueryString(query, filter, "", "", "");
        const userData = await db.query(queryString, {
            type: QueryTypes.SELECT,
        })
        if (userData.count > 0) {
            if (userData[0].username == req.body.username) {
                res.status(500).json({ msg: "Username Already!!!!" });
            }
        }
        const password = user.passsword;
        let hashesPassword = await bcrypt.hash(password, 10);

        user.passsword = hashesPassword;
        await Users.create(user);
        res.status(201).json({ msg: "Users Register" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const { username, passsword } = req.body;
        const user = await Users.findOne({
            where: {
                username: username
            }
        })
        
        if (!user) {
            return res.status(401).json({ msg: 'Authentication failed, username password salah' });
        }
        const passwordMatch = bcrypt.compareSync(passsword, user.dataValues.passsword);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user.id }, 'spw', {
            expiresIn: '1h',
        });
        console.log('userxxxxxx :', token);
        res.status(200).json({ token });
    } catch (error) {
        console.log('userxxxxxx :', error);
        res.status(500).json({ msg: error });
    }
}
