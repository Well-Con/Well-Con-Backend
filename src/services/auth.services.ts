import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import _prisma from "../prisma";
import { DoctorData } from "../types/DoctorData";
import userRepository from "../repository/user.repository";
class authServices {
    async getUserByEmail(email: string) {
        return userRepository.getUserByEmail(email);
    }
    async loginDoctor(email: string, password: string) {
        const doctor = await _prisma.doctor.findUnique({
            where: { email },
        });
        if (!doctor || doctor.password !== password) {
            return null;
        }
        return doctor;
    }
    async comparePasswords(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async registerDoctor(doctorData: DoctorData) {
        try {
            const doctor = await _prisma.doctor.create({
                data: { ...doctorData },
            });
            return doctor;
        } catch (error) {
            console.error("Error registering doctor:", error);
            throw new Error("Error registering doctor");
        }
    }
    async getUserbyEmail(email: string) {
        return userRepository.getUserByEmail(email);
    }
}



export default new authServices();
