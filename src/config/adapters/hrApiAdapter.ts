import { AxiosAdapter } from "./http/axios.adapter";

export const hrApiFetcher = new AxiosAdapter({
    baseUrl: import.meta.env.VITE_API_URL,
    params: {
    }
})