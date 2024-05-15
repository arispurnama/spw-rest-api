import express from "express"
import {getListUsers} from "../controller/UserController.js"

const route = express.Router();
route.get("/list-user", getListUsers);

export default route;