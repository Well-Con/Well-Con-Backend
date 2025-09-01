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
}
export default new DoctorController();