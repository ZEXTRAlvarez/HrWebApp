import { hrApiFetcher } from "../../config/adapters/hrApiAdapter";
import { UserLogin } from "../../infraestructure/interfaces/user.responses";
import * as UseCases from "../../core/use-cases/users";

export const registerUsersPromise = async (user: UserLogin) => {
    return await UseCases.registerUserUseCase(hrApiFetcher)(user);
};

export const loginUserPromise = async (user: UserLogin, setToken: (token: string) => void) => {
    const response = await UseCases.loginUserUseCase(hrApiFetcher, user);
    setToken(response.token); 
    return response;
};
