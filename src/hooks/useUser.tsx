import { useEffect } from "react"
import { hrApiFetcher } from "../config/adapters/hrApiAdapter"
import * as UseCases from "../core/use-cases/users"

interface UserParams{
    age: number;
    yearsOfExp: number;
    id: string;
    search: string;
}

const useUser = ({ age, search, yearsOfExp} : UserParams) => {

useEffect(() => {
    const loadUsers = async () => {

        const usersPromise = await UseCases.allUsersUseCase(hrApiFetcher);
        const usersByYearsOfExperiencePromise = await UseCases.usersByYearsOfExperience(hrApiFetcher)(yearsOfExp);
        const usersByAgePromise = await UseCases.usersByAgeUseCase(hrApiFetcher)(age);
        const deletedUserPromise = await UseCases.deleteUserUseCase(hrApiFetcher)(search);
        const [
            users,
            usersByYearsOfExperience,
            usersByAge,
            deletedUser
        ] = await Promise.all([
            usersPromise,
            usersByYearsOfExperiencePromise,
            usersByAgePromise,
            deletedUserPromise
        ]);

        return {
            users,
            usersByYearsOfExperience,
            usersByAge,
            deletedUser
        }
    };

    loadUsers();
}, [age, search, yearsOfExp]);
}

export default useUser;