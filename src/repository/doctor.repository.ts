import _prisma from "../prisma";
import { DoctorData } from "../types/DoctorData";

class Doctor{
    async getDoctorById(id: string) {
        try {
            const doctor = await _prisma.doctor.findUnique({
                where: { id }
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
                where: { email }
            });
            return doctor;
        } catch (error) {
            console.error("Error fetching doctor by email:", error);
            throw new Error("Could not fetch doctor");
        }   
    }
}

export default new Doctor();
