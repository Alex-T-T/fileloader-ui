import { HttpRoutesEnums } from "../emuns/appEnums";

self.onmessage = async function(event) {
    const { file, title, description } = event.data;
    
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const url = `${BASE_URL}api/v1/${HttpRoutesEnums.FILES}`;

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();

        if(!response.ok) {self.postMessage({ success: false, result })
        return
        }
        
        self.postMessage({ success: true, result });
    } catch (error) {
        self.postMessage({ success: false, error });
    }
};

