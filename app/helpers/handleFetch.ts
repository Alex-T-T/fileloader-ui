export const handleFetch = async (url: string, options: RequestInit, isBinary: boolean = false) => {
        const res = await fetch(url, options);

        if (!res.ok) {
            const response = await res.json()
            throw new Error(response.message);
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
};
