import { Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import _prisma from "../prisma";
import { DoctorDTO } from "../types/DoctorData";
import userRepository from "../repository/user.repository";
class authServices {
    async getUserByEmail(email: string) {
        return userRepository.getUserByEmail(email);
    }
    async comparePasswords(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async registerDoctor(doctorData: DoctorDTO) {
        try {
            const { address, ...userData } = doctorData;
            
            // Create doctor with nested user creation
            const doctor = await _prisma.doctor.create({
                data: {
                    expertise: userData.expertise,
                    education: userData.education,
                    experience: userData.experience,
                    registrationNo: userData.registrationNo,
                    consultationTypes: userData.consultationTypes,
                    consultationFee: userData.consultationFee,
                    user: {
                        create: {
                            name: userData.name,
                            email: userData.email,
                            password: userData.password, // Should already be hashed
                            age: userData.age,
                            phoneNo: userData.phoneNo,
                            gender: userData.gender,
                            role: "DOCTOR",
                            addresses: {
                                create: [address]
                            }
                        }
                    }
                },
                include: {
                    user: {
                        include: {
                            addresses: true
                        }
                    }
                }
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
    async registerUser(data: Object) {
        const { address, ...rest } = data as any;

        const userData: User = {
        ...rest,
        role: "PATIENT", // default role unless admin/doctor
        addresses: {
            create: [address],
        },
        };
        return userRepository.createUser(userData);
    }
}



export default new authServices();
