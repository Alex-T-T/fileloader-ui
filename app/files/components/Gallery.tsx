'use client';
import { useEffect, useState } from 'react';
import GalleryCard from './GalleryCard';
import { filesApi } from '@/app/helpers/api/filesAPI';
import { RotatingLines } from 'react-loader-spinner';

type GalleryProps = {
    data: IFile[];
    total: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    currentPage: number
};

export default function Gallery({data, total, isLoading, onPageChange , currentPage }: GalleryProps) {

    const limit = 12;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    return (
        <section className="w-full bg-secondary p-6 rounded-[32px]">
            {!isLoading &&
               <div className='grid grid-cols-4 gap-3 z-10'> {data.map((el) => <GalleryCard key={el.id} data={el}/>)}</div> }
            {isLoading && (
                <div className="absolute z-10 top-[30%] left-[50%] translate-x-[-50%]">
                    <RotatingLines
                        strokeColor="#1976D2"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="140"
                        visible={isLoading}
                    />
                </div>
            )}
            <div className="flex justify-end items-center mt-4">
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400  hover:bg-button-hover focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md ${
                                page === currentPage
                                    ? 'z-10 bg-[#ff8c8c] text-white'
                                    : 'text-white  hover:bg-button-hover'
                            } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8c8c] hover:bg-button-hover`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-button-hover focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </nav>
            </div>
        </section>
    );
}
