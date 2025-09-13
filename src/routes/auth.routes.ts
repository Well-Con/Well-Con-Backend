import express from "express";
import authController from "../controller/auth.controller";
const AuthRouter = express.Router();

AuthRouter.post("/signup", (req, res) => authController.registerDoctor(req, res));
AuthRouter.post("/login", (req, res) => authController.login(req, res));
AuthRouter.post("/signupUser", (req, res) => authController.registerUser(req, res));
// AuthRouter.get("/me", (req, res) => authController.getMe(req, res));
// AuthRouter.post("/logout", (req, res) => authController.logout(req, res));

export default AuthRouter;