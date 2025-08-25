import _prisma from "../prisma";
import { DoctorData } from "../types/DoctorData";

class userRepository {
    async registerDoctor(data: DoctorData) {
        // Implement your signup logic here
        const user = await _prisma.doctor.create({
            data: {
                ...data
            }
        });
        return user;
    }
}

export default new userRepository();
