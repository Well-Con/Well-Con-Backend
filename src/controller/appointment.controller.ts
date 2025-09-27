import {Request, Response} from "express";

class appointmentController {
    async getAppointmentById(req: Request, res: Response) {
        // Implementation here
    }
    async getAllAppointments(req: Request, res: Response) {
        // Implementation here
    }
    async createAppointment(req: Request, res: Response) {
        // Implementation here
    }
    async cancelAppointment(req: Request, res: Response) {
        // Implementation here
    }
}

export default new appointmentController();