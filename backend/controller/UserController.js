import Users from "../model/Users.js";
import Sequelize from "sequelize";
import db from "../config/Database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtSecret =
  "9fdba4617683cc4ae6e685293bccf7692a8be1591c6d6f2920a442aa719d038499fa09";
import {
  PaginationHelper,
  QueryHelper,
  customNumberGenerator,
} from "../Helper/QueryHalper.js";
import { response } from "express";
import Role from "../model/Role.js";
import { sendEmail } from "../middleware/senEmail.js";

const { QueryTypes } = Sequelize;

export const getListUsers = async (req, res) => {
  const responsePagination = new Object();
  try {
    let page = req.query.page;
    let size = req.query.size;
    let search = req.query.search;
    let searchColumn =
      'users."id", users."fullName", users."noHp", users."firstName", users."lastName", users."kelas", users."email", users."username", users."password", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name';
    let query =
      'SELECT count(*) over () TOTALDATA, users."id", users."fullName", users."noHp", users."firstName", users."lastName", users."kelas", users."email", users."username", users."password", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id where users."isDeleted" = false ';
    let paggination = PaginationHelper(page, size);
    let queryString = QueryHelper(
      query,
      "",
      search,
      searchColumn,
      "",
      paggination,
      ""
    );
    const response = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });

    let queryStringCount = QueryHelper(
      query,
      "",
      search,
      searchColumn,
      "",
      "",
      ""
    );
    const total = await db.query(queryStringCount, {
      type: QueryTypes.SELECT,
    });
    let totalData = 0;
    if (total.length > 0) {
      totalData = total[0].totaldata;
    }
    responsePagination.page = page;
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
};
export const createUsers = async (req, res) => {
  const response = new Object();
  try {
    let user = req.body;
    let filter = "";
    console.log("userrrrr ", user);
    let query = `SELECT users."id", users."firstName", users."lastName", users."kelas", users."email", users."username", users."password", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id where users."isDeleted" = false and users."deletedAt" is null`;

    if (user.username != "") {
      filter += ` and users."username" = '${req.body.username}' `;
    }
    let queryString = QueryHelper(query, filter, "", "", "", "", "");
    const userData = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });
    if (userData.length > 0) {
      if (userData[0].username == req.body.username) {
        response.error = true;
        response.errorMessage = "Username Already!!!!";
        return res.status(500).json({ response });
      }
    }

    const password = user.password;
    let hashesPassword = await bcrypt.hash(password, 10);

    user.password = hashesPassword;
    user.isDeleted = false;
    user.createdAt = new Date().toDateString();
    user.updatedAt = new Date().toDateString();
    user.fullName = `${user.firstName} ${user.lastName}`;
    await Users.create(user);

    response.data = user;
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};
export const updateUsers = async (req, res) => {
  try {
    const userData = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Roles Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUsers = async (req, res) => {
  const response = new Object();
  try {
    let id = req.params.id;
    let query = `UPDATE public."TB_MD_USER" SET "deletedAt" = CURRENT_DATE, "isDeleted" = true  where "id" = ${parseInt(
      id
    )} `;

    const userData = await db.query(query, {
      type: QueryTypes.UPDATE,
    });

    const result = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.data = result;
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};
export const getUserById = async (req, res) => {
  const response = new Object();
  try {
    const result = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    response.data = result;
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};

export const Registers = async (req, res) => {
  const response = new Object();
  try {
    let user = req.body;
    let filter = "";
    let query = `SELECT users."id", users."firstName", users."lastName", users."kelas", users."email", users."username", users."password", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id where users."isDeleted" = false and users."deletedAt" is null`;

    if (user.username != "") {
      filter += ` and users."username" = '${req.body.username}' `;
    }
    let queryString = QueryHelper(query, filter, "", "", "", "", "");
    const userData = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });
    if (userData.length > 0) {
      if (userData[0].username == req.body.username) {
        response.error = true;
        response.errorMessage = "Username Already!!!!";
        return res.status(500).json({ response });
      }
    }
    const dataRole = await Role.findOne({
      where: {
        name: "User",
      },
    });
    console.log(dataRole);
    if (!dataRole) {
      console.log(dataRole);
    }
    const password = user.password;
    let hashesPassword = await bcrypt.hash(password, 10);

    user.password = hashesPassword;
    user.roleId = dataRole.dataValues.id;
    user.isDeleted = false;
    user.createdAt = new Date().toDateString();
    user.updatedAt = new Date().toDateString();
    user.fullName = `${user.firstName} ${user.lastName}`;
    await Users.create(user);

    response.data = user;
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};

export const Login = async (req, res) => {
  const response = new Object();
  try {
    let filter = "";
    const { username, password } = req.body;
    let query = `SELECT users."id", users."firstName", users."lastName", users."kelas", users."email", users."username", users."password", users."roleId", users."createdAt", users."updatedAt", users."deletedAt", users."isDeleted", roles.name FROM public."TB_MD_USER" as users INNER JOIN public."TB_MD_ROLE" as roles on users."roleId" = roles.id where users."isDeleted" = false and users."deletedAt" is null`;

    if (username != "") {
      filter += ` and users."username" = '${username}' `;
    }
    let queryString = QueryHelper(query, filter, "", "", "", "", "");
    const userData = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });
    let objUser;

    console.log("user   ", userData);
    if (userData.length > 0) {
      objUser = userData.reduce((acc, item) => {
        return { ...acc, ...item };
      }, {});
    }
    console.log("obj", objUser);
    if (objUser == undefined) {
      response.error = true;
      response.errorMessage = "Authentication failed, username password salah";
      return res.status(401).json({ response });
    }

    const passwordMatch = bcrypt.compareSync(password, objUser.password);
    if (!passwordMatch) {
      response.error = true;
      response.errorMessage = "Authentication failed, username password salah";
      return res.status(401).json({ response });
    }
    const name = `${objUser.firstName} ${objUser.lastName}`;
    const maxAge = 3 * 60 * 60;
    //generet token
    const token = jwt.sign(
      {
        id: objUser.id,
        username,
        name,
        role: objUser.roleId,
        rolename: objUser.name,
      },
      jwtSecret,
      {
        expiresIn: "3h",
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 1hrs in ms
    });
    response.token = token;
    response.data = objUser;
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(200).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};

export const CheckUsername = async (req, res) => {
  const response = new Object();
  try {
    const dataUser = await Users.findOne({
      where: {
        username: req.params.username,
      },
    });
    console.log("data user : ", dataUser);
    if (dataUser == null) {
      response.error = true;
      response.errorMessage = "username tidak ditemukan!!!";
      res.status(500).json({ response });
    }
    const result = customNumberGenerator();
    let payload = {
      otp: result,
    };
    await Users.update(payload, {
      where: {
        id: dataUser.id,
      },
    });
    let html = `<h2>Hi ${dataUser.fullName},</h2>
<p>We received a request to reset your Sijagoan password.</p>
<p>OTP reset password ${result}</p>
<h4>If you ignore this message, your password will not be changed.</h4>`;
    sendEmail(
      dataUser.email,
      "Notification OTP Reset Password",
      "OTP Reset Password",
      html
    );
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    console.log(error.message);
  }
};

export const forgotPassword = async (req, res) => {
  const response = new Object();
  try {
    const dataUser = await Users.findOne({
      where: {
        otp: req.params.otp,
      },
    });
    console.log("data user : ", dataUser);
    if (dataUser == null) {
      response.error = true;
      response.errorMessage = "OTP salah!!!";
      res.status(500).json({ response });
    }

    let payload = req.body;
    const password = payload.password;
    let hashesPassword = await bcrypt.hash(password, 10);

    payload.password = hashesPassword;
    payload.otp = null;
    await Users.update(payload, {
      where: {
        id: dataUser.id,
      },
    });

    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    console.log(error.message);
  }
};

export const gantiPassword = async (req, res) => {
  const response = new Object();
  try {
    const {password, newPassword} = req.body;
    const dataUser = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log("data user : ", dataUser);
    if (dataUser == null) {
      response.error = true;
      response.errorMessage = "gagal!!!";
      res.status(500).json({ response });
    }
    const passwordMatch = bcrypt.compareSync(password, dataUser.password);
    if (!passwordMatch) {
      response.error = true;
      response.errorMessage = "the old password is not the same";
      return res.status(500).json({ response });
    }

    let hashesPassword = await bcrypt.hash(newPassword, 10);
    let payload ={
      password: hashesPassword
    }

    await Users.update(payload, {
      where: {
        id: dataUser.id,
      },
    });

    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    console.log(error.message);
  }
};
