import * as express from "express";
import roleRoute from "./password.route";

const Routes = express.Router();

Routes.use("/password", roleRoute);

export default Routes;
