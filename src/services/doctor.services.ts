import doctorRepository from "../repository/doctor.repository"; 

class doctorServices{
    async getDoctorByEmail(email: string) {
        try {
            const doctor = await doctorRepository.getDoctorByEmail(email);
            return doctor;
        } catch (error) {
            console.error("Error fetching doctor by email:", error);
            throw new Error("Could not fetch doctor");
        }
    }
    async getAllDoctors() {
        try {
            const doctors = await doctorRepository.getAllDoctors();
            return doctors;
        } catch (error) {
            console.error("Error fetching all doctors:", error);
            throw new Error("Could not fetch doctors");
        }
    }
    async getDoctorBySpecialization(specialization: string) {
        try {
            const doctors = await doctorRepository.getAllDoctors();
            return doctors.filter(doctor => doctor.specialization === specialization);
        } catch (error) {
            console.error("Error fetching doctors by specialization:", error);
            throw new Error("Could not fetch doctors");
        }
    }

    async getDoctorById(id: string) {
        try {
            const doctor = await doctorRepository.getDoctorById(id);
            return doctor;
        } catch (error) {
            console.error("Error fetching doctor by ID:", error);
            throw new Error("Could not fetch doctor");
        }
    }
}

export default new doctorServices();