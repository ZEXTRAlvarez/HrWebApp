import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { Applicant } from "../../entities/applicant.entity";

export const applicantByAgeUseCase = (fetcher: HttpAdapter) => async (age: number, token: string): Promise<Applicant[]> => {
    try {
        const users = await fetcher.get<Applicant[]>('/applicant/search', {
            params: { age },
            headers: { 
                "x-auth-token": token  
            }
        });
        return users;
    } catch (error) {
        throw new Error(`Error fetching applicant/s by age: ${error}`);
    }
};
