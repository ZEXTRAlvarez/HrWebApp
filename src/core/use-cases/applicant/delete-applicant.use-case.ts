import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { Applicant } from "../../entities/applicant.entity";

export const deleteUserUseCase = (fetcher: HttpAdapter) => async (id: string, token: string): Promise<Applicant> => {
    try {
        const user = await fetcher.delete<Applicant>(`/users/${id}`, {
            headers: {
                "x-auth-token": token 
            }
        });
        return user;
    } catch (error) {
        throw new Error(`Error deleting applicant by id: ${error}`);
    }
};
