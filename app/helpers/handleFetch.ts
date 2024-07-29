export const handleFetch = async (url: string, options: RequestInit, isBinary: boolean = false) => {
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(res.status.toString(), { cause: res });
        }

        if (res.status === 204) {
            return; 
        }

        if (isBinary) {
            const arrayBuffer = await res.arrayBuffer();
            const contentType = res.headers.get('Content-Type') || 'application/octet-stream';
            const contentDisposition = res.headers.get('Content-Disposition');
            const filename = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : 'downloaded_file';
        
     

     
            return { arrayBuffer, contentType, filename };
        } else {
            return await res.json();
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error with API request');
    }
};
