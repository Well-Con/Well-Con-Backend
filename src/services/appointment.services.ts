import appointmentRepository from "../repository/appointment.repository";

class AppointmentServices {
    async getAppointmentById(id: string) {
        return await appointmentRepository.getAppointmentById(id);
    }

    async changeAppointmentStatus(
        id: string,
        status: "Pending" | "Cancelled" | "Completed" | "Requested"
    ) {
        const appointment = await appointmentRepository.getAppointmentById(id);
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        appointment.status = status;
        return await appointmentRepository.createAppointment(appointment);
    }

    async getAllAppointments(userId: string) {
        return await appointmentRepository.getAllAppointments(userId);
    }

    async createAppointment(data: any) {
        return await appointmentRepository.createAppointment(data);
    }

    async deleteAppointment(id: string) {
        return await appointmentRepository.deleteAppointment(id);
    }
}

export default new AppointmentServices();
