import express from "express"
import {getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
getListRoles} from "../controller/RoleController.js"

const route = express.Router();
route.get("/list-role", getListRoles);
route.get("/role", getRoles);
route.get('/role/:id', getRoleById);
route.post('/role', createRole);
route.patch('/role/:id', updateRole);
route.delete('/role/:id', deleteRole);

export default route;