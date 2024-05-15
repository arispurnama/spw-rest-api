import express from "express"
import {getListUsers, createUsers} from "../controller/UserController.js"

const route = express.Router();
route.get("/list-user", getListUsers);
route.post("/user", createUsers);

export default route;