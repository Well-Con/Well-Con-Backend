import _prisma from "../prisma";

class AppointmentRepository {
    async getAppointmentById(id: string) {
        return await _prisma.appointment.findUnique({
            where: { id }
        });
    }

    async getAllAppointments(userId: string) {
        return await _prisma.appointment.findMany({
            where: { userId }
        });
    }

    async createAppointment(data: any) {
        return await _prisma.appointment.create({
            data
        });
    }

    async deleteAppointment(id: string) {
        return await _prisma.appointment.delete({
            where: { id }
        });
    }
}

export default new AppointmentRepository();