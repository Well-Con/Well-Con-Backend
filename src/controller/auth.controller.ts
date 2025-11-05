import { Request, Response } from "express";
import userRepository from "../repository/user.repository";
import { DoctorDTO } from "../types/DoctorData";
import doctorServices from "../services/doctor.services";
import authServices from "../services/auth.services";
import generateToken from "../utils/jwt";

class authController {
    async registerDoctor(req : Request, res: Response) {
        const doctorData = req.body as DoctorDTO;

        if (!doctorData) {
            return res.status(400).json({ error: "Invalid doctor data" });
        }

        const hashedPassword = await authServices.hashPassword(doctorData.password);

        const doctor = await authServices.registerDoctor({ ...doctorData, password: hashedPassword });
        const token = await generateToken(doctor.id, res);
        return res.json({ user: doctor, token });
    }
    async loginDoctor(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const Doctor = await authServices.getUserbyEmail(email);
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
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        try {
            const user = await authServices.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const passwordMatch = await authServices.comparePasswords(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            
            const token = await generateToken(user.id, res);

            return res.json({ user, token });
        } catch (error) {
            console.error("Error logging in:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async registerUser(req: Request, res: Response) {
        const userData = req.body;

        if (!userData) {
            return res.status(400).json({ error: "Invalid user data" });
        }
        try {
            const existingUser = await userRepository.getUserByEmail(userData.email);
            if (existingUser) {
                return res.status(400).json({ error: "Email already in use" });
            }
            const hashedPassword = await authServices.hashPassword(userData.password);
            const newUser = await userRepository.createUser({ ...userData, password: hashedPassword });
            const token = await generateToken(newUser.id, res);
            return res.status(201).json({ user: newUser, token });
        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new authController();
