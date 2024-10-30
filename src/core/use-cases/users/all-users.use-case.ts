import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { User } from "../../entities/user.entity";

export const allUsersUseCase = async (fetcher : HttpAdapter) : Promise<User[]> => {
    try {
        const users = await fetcher.get<User[]>('/users');
        return users;
    } catch (error) {
        throw new Error(`Error fetching users: ${error}`);
    }
}