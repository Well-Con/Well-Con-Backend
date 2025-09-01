import express from "express";

const DoctorRouter = express.Router();

DoctorRouter.post("/getUserbyId", (req, res) => authController.getUserById(req, res));
// DoctorRouter.post("/login", (req, res) => authController.login(req, res));
// DoctorRouter.get("/me", (req, res) => authController.getMe(req, res));
// DoctorRouter.post("/logout", (req, res) => authController.logout(req, res));

export default DoctorRouter;