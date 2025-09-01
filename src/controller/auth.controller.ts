import { Request, Response } from "express";
import userRepository from "../repository/user.repository";
import { DoctorData } from "../types/DoctorData";

class authController {
    async registerDoctor(req : Request, res: Response) {
        const doctorData = req.body as DoctorData;

        if (!doctorData) {
            return res.status(400).json({ error: "Invalid doctor data" });
        }
        
        const user = await userRepository.registerDoctor(doctorData);
        return res.json(user);
    }
}

export default new authController();
