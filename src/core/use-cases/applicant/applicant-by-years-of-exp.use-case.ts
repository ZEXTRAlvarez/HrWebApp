import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { Applicant } from "../../entities/applicant.entity";

export const usersByYearsOfExperience = ( fetcher : HttpAdapter, token : string ) => async ( yearsOfExperience : number ) : Promise<Applicant[]> => {
    try {
        const users = await fetcher.get<Applicant[]>('/applicant/search', { 
            params: { yearsOfExperience },
            headers: { 
                "x-auth-token": token  
            }
        });
        return users;
    } catch (error) {
        throw new Error(`Error fetching applicant/s by years of experience: ${error}`);
    }
}