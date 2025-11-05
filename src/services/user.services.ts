import userRepository from "../repository/user.repository";


class UserServices {
    async getUserRole(email: string): Promise<string | null> {
        const user = await userRepository.getUserByEmail(email);
        return user ? user.role : null;
    }

    async getUserDetailsById(id: string) {
        const user = await userRepository.getUserById(id);
        return user;
    }
    async getUserByEmail(email: string) {
        return userRepository.getUserByEmail(email);
    }

    async getUserByPhoneNo(phoneNo: string) {
        return userRepository.getUserByPhoneNo(phoneNo);
    }
}

export default new UserServices();