import express from "express";
import doctorController from "../controller/doctor.controller";
const DoctorRouter = express.Router();

DoctorRouter.get("/getDoctorbyEmail", (req, res) => doctorController.getDoctorByEmail(req, res));
DoctorRouter.get("/getAllDoctors", (req, res) => doctorController.getAllDoctors(req, res));
DoctorRouter.get("/getDoctorbySpecialization", (req, res) => doctorController.getDoctorBySpecialization(req, res));
DoctorRouter.get("/getDoctorbyId", (req, res) => doctorController.getDoctorById(req, res));
// DoctorRouter.post("/login", (req, res) => authController.login(req, res));
// DoctorRouter.get("/me", (req, res) => authController.getMe(req, res));
// DoctorRouter.post("/logout", (req, res) => authController.logout(req, res));

export default DoctorRouter;