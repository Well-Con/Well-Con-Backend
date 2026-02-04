import { User, Prisma } from "@prisma/client";
import _prisma from "../prisma";
import { DoctorData } from "../types/DoctorData";
import { UserData } from "../types/UserData";

class userRepository {
    async registerDoctor(data: DoctorData) {
        // Implement your signup logic here
        const user = await _prisma.doctor.create({
            data: {
                ...data
            }
        });
        return user;
    }
    getUserByEmail(email: string) {
        return _prisma.user.findUnique({
            where: { email },
        });
    }
    getUserByPhoneNo(phoneNo: string) {
        return _prisma.user.findUnique({
            where: { phoneNo },
        });
    }
    // Fix: Change parameter type to handle nested creation
    createUser(data: Prisma.UserCreateInput) {
        return _prisma.user.create({
            data,
        });
    }
    getUserById(id: string) {
        return _prisma.user.findUnique({
            where: { id },
        });
    }   
    updateUserById(id: string, updateData: Partial<{ name: string; email: string; phoneNo: string; password: string; }>) {
        return _prisma.user.update({
            where: { id },
            data: updateData,
        });
    }
}

export default new userRepository();
