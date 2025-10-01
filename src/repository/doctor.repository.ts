import _prisma from "../prisma";
import { DoctorData } from "../types/DoctorData";

class doctorRepository{
    async getDoctorById(id: string) {
        try {
            const doctor = await _prisma.doctor.findUnique({
                where: { id },
                include: {
                    user: true, // this will pull in all user fields (name, email, phoneNo, etc.)
                },
            });
            return doctor;
        } catch (error) {
            console.error("Error fetching doctor by ID:", error);
            throw new Error("Could not fetch doctor");
        }
    }
    async getDoctorByEmail(email: string) {
        try {
            const doctor = await _prisma.doctor.findUnique({
                where: { email },
                include: {
                    user: true, // this will pull in all user fields (name, email, phoneNo, etc.)
                },
            });
            return doctor;
        } catch (error) {
            console.error("Error fetching doctor by email:", error);
            throw new Error("Could not fetch doctor");
        }   
    }
    async getAllDoctors() {
        try {
                const doctors = await _prisma.doctor.findMany({
                    include: {
                        user: true, // this will pull in all user fields (name, email, phoneNo, etc.)
                    },
                });
            return doctors;
        } catch (error) {
            console.error("Error fetching all doctors:", error);
            throw new Error("Could not fetch doctors");
        }
    }
    
}

export default new doctorRepository();
