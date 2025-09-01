import { Request, Response } from "express";
import userRepository from "../repository/user.repository";
import { DoctorData } from "../types/DoctorData";
import doctorServices from "../services/doctor.services";
import authServices from "../services/auth.services";
import generateToken from "../utils/jwt";

class authController {
    async registerDoctor(req : Request, res: Response) {
        const doctorData = req.body as DoctorData;

        if (!doctorData) {
            return res.status(400).json({ error: "Invalid doctor data" });
        }
        
        const user = await userRepository.registerDoctor(doctorData);
        return res.json(user);
    }
    async loginDoctor(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const Doctor = await doctorServices.getDoctorByEmail(email);
        if(!Doctor) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const passwordMatch = await authServices.comparePasswords(password, Doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = await generateToken(Doctor.id, res);

        return res.json({ Doctor: Doctor, token });
    }
}

export default new authController();
