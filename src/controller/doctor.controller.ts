import { Request, Response } from "express";
import doctorServices from "../services/doctor.services";
class DoctorController{
    async getDoctorByEmail(req: Request, res: Response) {
        const { email } = req.query;
        try {
            const doctor = await doctorServices.getDoctorByEmail(email as string);
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            return res.status(200).json(doctor);
        } catch (error) {
            console.error("Error fetching doctor by email:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllDoctors(req: Request, res: Response) {
        try {
            const doctors = await doctorServices.getAllDoctors();
            return res.status(200).json(doctors);
        } catch (error) {
            console.error("Error fetching all doctors:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getDoctorBySpecialization(req: Request, res: Response) {
        const { specialization } = req.query;
        try {
            const doctors = await doctorServices.getDoctorBySpecialization(specialization as string);
            return res.status(200).json(doctors);
        } catch (error) {
            console.error("Error fetching doctors by specialization:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getDoctorById(req: Request, res: Response) {
        const { id } = req.query;
        try {
            const doctor = await doctorServices.getDoctorById(id as string);
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            return res.status(200).json(doctor);
        } catch (error) {
            console.error("Error fetching doctor by ID:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
export default new DoctorController();