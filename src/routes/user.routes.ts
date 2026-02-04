import express from "express";
import appointmentController from "../controller/appointment.controller";
import userController from "../controller/user.controller";
const UserRouter = express.Router();

UserRouter.get("/allAppointments/:id", (req, res) => appointmentController.getAllAppointments(req, res));
// AuthRouter.get("/me", (req, res) => authController.getMe(req, res));
// UserRouter.post("/logout", (req, res) => authController.logout(req, res));
UserRouter.patch("/updateProfile/:id", (req, res) => userController.updateProfile(req, res));    
export default UserRouter;