import express from "express";
import cors from "cors";
import roleRoute from "./routes/RoleRoute.js";
import userRoute from "./routes/UserRoute.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(roleRoute);
app.use(userRoute);

app.listen(3000, () => console.log('Server up and running.......'))