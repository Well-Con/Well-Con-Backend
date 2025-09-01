import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import _prisma from "../prisma";
class authServices {
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
}



export default new authServices();
