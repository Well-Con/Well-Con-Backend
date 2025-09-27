import express from "express";
import appointmentController from "../controller/appointment.controller";
const UserRouter = express.Router();

UserRouter.get("/allAppointments/:id", (req, res) => appointmentController.getAllAppointments(req, res));
// AuthRouter.get("/me", (req, res) => authController.getMe(req, res));
// UserRouter.post("/logout", (req, res) => authController.logout(req, res));

export default UserRouter;