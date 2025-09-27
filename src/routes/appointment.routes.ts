import express from "express";
import appointmentController from "../controller/appointment.controller";
const AppointmentRouter = express.Router();

AppointmentRouter.get("/getAppointmentById", (req, res) => appointmentController.getAppointmentById(req, res));
AppointmentRouter.get("/getAll", (req, res) => appointmentController.getAllAppointments(req, res));
AppointmentRouter.post("/create", (req, res) => appointmentController.createAppointment(req, res));
AppointmentRouter.delete("/changeStatus", (req, res) => appointmentController.changeAppointmentStatus(req, res));
// DoctorRouter.post("/login", (req, res) => authController.login(req, res));
// DoctorRouter.get("/me", (req, res) => authController.getMe(req, res));
// DoctorRouter.post("/logout", (req, res) => authController.logout(req, res));

export default AppointmentRouter;