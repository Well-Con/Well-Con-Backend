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
}

export default new userRepository();
