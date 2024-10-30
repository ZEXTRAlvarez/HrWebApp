import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { User } from "../../entities/user.entity";

export const deleteUserUseCase = ( fetcher : HttpAdapter ) => async ( id : string ) : Promise<User> => {
    try {
        const user = await fetcher.delete<User>(`/users/${id}`);
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by id: ${error}`);
    }
}