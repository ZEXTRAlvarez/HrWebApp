import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { UserLogin, UserResponse } from "../../../infraestructure/interfaces/user.responses";

export const loginUserUseCase = async (fetcher : HttpAdapter, user : UserLogin) : Promise<UserResponse> => {
    try {
        const newUser = await fetcher.postLogin<UserResponse>('/user/login', user);
        return newUser;
    } catch (error) {
        throw new Error(`Error logging in user: ${error}`);
    }
}