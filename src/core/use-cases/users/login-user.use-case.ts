import { HttpAdapter } from "../../../config/adapters/http/http.adapter";

export interface UserLogin{
    email: string;
    password: string;
}

export const loginUserUseCase = async (fetcher : HttpAdapter, user : UserLogin) : Promise<UserLogin> => {
    try {
        const newUser = await fetcher.postLogin<UserLogin>('/users/login', user);
        return newUser;
    } catch (error) {
        throw new Error(`Error logging in user: ${error}`);
    }
}