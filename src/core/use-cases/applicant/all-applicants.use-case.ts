import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { Applicant } from "../../entities/applicant.entity";

export const allApplicantsUseCase = async (fetcher : HttpAdapter, token: string) : Promise<Applicant[]> => {
    try {
        const applicants = await fetcher.get<Applicant[]>('/applicant',{
            headers: { 
                "x-auth-token": token  
            }
        });
        return applicants;
    } catch (error) {
        throw new Error(`Error fetching applicant/s: ${error}`);
    }
}