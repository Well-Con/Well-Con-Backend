import {Request, Response} from "express";
import appointmentServices from "../services/appointment.services";

class appointmentController {
    async getAppointmentById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            if(!id){
                return res.status(400).json({message: "Appointment ID is required"});
            }
            const appointment = await appointmentServices.getAppointmentById(id);
            if (appointment) {
                return res.json(appointment);
            }
            return res.status(404).json({message: "Appointment not found"});
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"});
        }
        
    }
    async getAllAppointments(req: Request, res: Response) {
        try {
            const appointments = await appointmentServices.getAllAppointments();
            return res.json(appointments);
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
    async createAppointment(req: Request, res: Response) {
        try {
            const appointmentData = req.body;
            const newAppointment = await appointmentServices.createAppointment(appointmentData);
            return res.status(201).json(newAppointment);
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
    async changeAppointmentStatus(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const {status} = req.body;
            if(!id){
                return res.status(400).json({message: "Appointment ID is required"});
            }
            const appointment = await appointmentServices.getAppointmentById(id);
            if (!appointment) {
                return res.status(404).json({message: "Appointment not found"});
            }
            await appointmentServices.changeAppointmentStatus(id, status);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"});
        }
    }

}

export default new appointmentController();