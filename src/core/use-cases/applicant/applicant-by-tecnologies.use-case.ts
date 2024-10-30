import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { Applicant } from "../../entities/applicant.entity";

export const applicantByTecnologiesUseCase = ( fetcher : HttpAdapter, token : string ) => async ( technologies : string[] ) : Promise<Applicant[]> => {
    try {
        const users = await fetcher.get<Applicant[]>('/applicant/search', {
            params: { technologies },
            headers: { 
                "x-auth-token": token  
            }
        });
        return users;
    } catch (error) {
        throw new Error(`Error fetching applicant/s by technologies: ${error}`);
    }
}