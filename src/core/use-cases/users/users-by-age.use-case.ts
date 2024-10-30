import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { User } from "../../entities/user.entity";

export const usersByAgeUseCase = ( fetcher : HttpAdapter ) => async ( age : number ) : Promise<User[]> => {
    try {
        const users = await fetcher.get<User[]>('/users', { params: { age } });
        return users;
    } catch (error) {
        throw new Error(`Error fetching users by age: ${error}`);
    }
}