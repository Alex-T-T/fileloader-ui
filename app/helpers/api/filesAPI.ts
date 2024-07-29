import { HttpRoutesEnums } from '../emuns/appEnums';
import { handleFetch } from '../handleFetch';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log('BASE_URL: ', BASE_URL);

type getAllFilesProps = {
    limit?: number | undefined,
    currentPage?: number | undefined
    search?: string | undefined
}


export const filesApi = {
    getAllFiles: async (
{limit = 2, currentPage = 1, search}: getAllFilesProps
    ) => {
        const url = `${BASE_URL}api/v1/${HttpRoutesEnums.FILES}?limit=${limit}&page=${currentPage}&search=${search}`;
        return handleFetch(url, { next: { revalidate: 0 } });
    },

    downloadFile: async (
        id: number
    ) => {
        const url = `${BASE_URL}api/v1/${HttpRoutesEnums.FILES}/${id}`;
        const options: RequestInit = {
            method: 'GET',
            next: { revalidate: 0 },
        };

        return handleFetch(url, options, true);
    },

    uploadFile: async (
        file: File,
        title: string,
        description: string ,
    
    ) => {
        const url = `${BASE_URL}api/v1/${HttpRoutesEnums.FILES}`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
 

        const options: RequestInit = {
            method: 'POST',
            body: formData,
            next: { revalidate: 0 },
        };

        return handleFetch(url, options);
    },

    deleteFile: async (
        id: number,
    
    ) => {
        const url = `${BASE_URL}api/v1/${HttpRoutesEnums.FILES}/${id}`;
        const options: RequestInit = {
            method: 'DELETE',
            next: { revalidate: 0 },
        };

        return handleFetch(url, options);
    },
};
