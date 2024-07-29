'use client';
import { useState } from 'react';
import { Text } from '../../components/Text';
import Image from 'next/image';
import { filesApi } from '@/app/helpers/api/filesAPI';

export default function GalleryCard({ data }: { data: IFile }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isAdditionalInfoHovered, setIsAdditionalInfoHovered] =
        useState(false);

    const { name, size, description, extention, downloads, id } = data;



const handleOpenFile = async (id: number) => {

    try {
        const { arrayBuffer, contentType, filename } = await filesApi.downloadFile(id);
        const blob = new Blob([arrayBuffer], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

    return (
        <div
            className="w-full bg-home p-3 rounded-xl flex flex-col group relative group-hover:rounded-t-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full mb-3 bg-violet rounded-lg p-3 flex items-center justify-center hover:cursor-custom-cursor ">
                <div className="w-[68px] h-[68px] flex items-center justify-center">
                    <Image
                        src="/Vector.svg"
                        width={45}
                        height={57}
                        alt="file image"
                    />
                </div>
            </div>
            <div
                className={
                    'transition-all duration-300 ease-in-out overflow-hidden'
                }
            >
                <Text className="text-xl text-white">{name}</Text>
            </div>
            {(isHovered || isAdditionalInfoHovered) && (
                <div
                    className="absolute top-[90%] left-0 w-full bg-home p-3 rounded-b-xl z-10"
                    onMouseEnter={() => setIsAdditionalInfoHovered(true)}
                    onMouseLeave={() => setIsAdditionalInfoHovered(false)}
                >
                    <Text className="text-secondary text-sm flex justify-between items-center pb-2 mb-2 border-b border-b-secondary">
                        Size <span className="text-white text-sm">{size}</span>
                    </Text>
                    <Text className="text-secondary text-sm flex justify-between items-center pb-2 mb-2 border-b border-b-secondary">
                        ID<span className="text-white text-sm">{id}</span>
                    </Text>
                    <Text className="text-secondary text-sm flex justify-between items-center pb-2 mb-2 border-b border-b-secondary">
                        Download count{' '}
                        <span className="text-white text-sm">{downloads}</span>
                    </Text>
                    <Text className="text-secondary text-sm flex justify-between items-center pb-2 mb-2 border-b border-b-secondary">
                        File extention{' '}
                        <span className="text-white text-sm">{extention}</span>
                    </Text>
                    <Text className="text-secondary text-sm flex justify-between items-center pb-2 mb-6 border-b border-b-secondary ">
                        Description
                        <span className="text-white text-sm">
                            {' '}
                            {description}
                        </span>
                    </Text>

                    <button
                        type="button"
                        className="w-full py-3 px-6 bg-rose rounded-[40px] mb-3"
                        onClick={() => handleOpenFile(id)}
                    >
                        Open
                    </button>

                </div>
            )}
        </div>
    );
}
