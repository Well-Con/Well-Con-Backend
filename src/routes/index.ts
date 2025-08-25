import express from "express"
import _prisma from "@prisma/client";
import AuthRouter from "./auth.routes";

const v1Router = express.Router();

v1Router.use("/auth", AuthRouter);
// v1Router.use("/users", UserRouter);
// v1Router.use("/google", GoogleOAuthRouter);

export default v1Router