import { Request, Response } from "express";
import userRepository from "../repository/user.repository";
import { DoctorData } from "../types/DoctorData";
import doctorServices from "../services/doctor.services";
import authServices from "../services/auth.services";
import generateToken from "../utils/jwt";
import userServices from "../services/user.services";

class UserController {
    async getUserRole(req: Request, res: Response) {
        const { email } = req.query;
        try {
            const userRole = await userServices.getUserRole(email as string);
            if (!userRole) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(userRole);
        } catch (error) {
            console.error("Error fetching user role:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserDetailsById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userServices.getUserDetailsById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user details:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async updateProfile(req: Request, res: Response) {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const updatedUser = await userServices.updateProfile(id, updateData);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating profile:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new UserController();
