import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { Company } from "../../entities/company.entity";

export const createCompanyUseCase = ( fetcher : HttpAdapter ) => async ( company : Company ) : Promise<Company> => {
    try {
        const newCompany = await fetcher.post<Company>('/company', company);
        return newCompany;
    } catch (error) {
        throw new Error(`Error creating company: ${error}`);
    }
}