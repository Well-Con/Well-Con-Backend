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
}

export default new doctorServices();