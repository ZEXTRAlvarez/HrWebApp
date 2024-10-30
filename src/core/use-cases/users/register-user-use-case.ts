import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { UserLogin } from "./login-user.use-case";

export const registerUserUseCase = ( fetcher : HttpAdapter ) => async ( user : UserLogin ) : Promise<UserLogin> => {
    try {
        const newUser = await fetcher.postLogin<UserLogin>('/users/register', user);
        return newUser;
    } catch (error) {
        throw new Error(`Error registering user: ${error}`);
    }
}