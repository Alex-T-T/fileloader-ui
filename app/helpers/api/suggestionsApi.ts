import { HttpRoutesEnums } from '../emuns/appEnums';
import { handleFetch } from '../handleFetch';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const suggestionApi = {

    getSuggestions: async (
        query: string
    ) => {
        const url = `${BASE_URL}api/v1/${HttpRoutesEnums.SUGGESTIONS}?search=${query}`;
        const options: RequestInit = {
            method: 'GET',
            next: { revalidate: 0 },
        };

        return handleFetch(url, options);
    },
}
