import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { User } from "../../entities/user.entity";

export const usersByTecnologiesUseCase = ( fetcher : HttpAdapter ) => async ( technologies : string[] ) : Promise<User[]> => {
    try {
        const users = await fetcher.get<User[]>('/users', { params: { technologies } });
        return users;
    } catch (error) {
        throw new Error(`Error fetching users by technologies: ${error}`);
    }
}