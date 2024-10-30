import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { User } from "../../entities/user.entity";

export const usersByYearsOfExperience = ( fetcher : HttpAdapter ) => async ( yearsOfExperience : number ) : Promise<User[]> => {
    try {
        const users = await fetcher.get<User[]>('/users', { params: { yearsOfExperience } });
        return users;
    } catch (error) {
        throw new Error(`Error fetching users by years of experience: ${error}`);
    }
}