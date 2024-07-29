import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

interface DropzoneProps {
    onFileSelect: (selectedFile: File) => void;
  }

export const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect }) => {

 

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
          if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
          }
        },
        [onFileSelect]
      );
    
      const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDrop,
      });



  return (
    <div className='container mb-6 border rounded-xl flex flex-col items-center justify-center py-6 px-3'>
      <div {...getRootProps({className: 'dropzone flex flex-col items-center'})} >
   <div className='w-full flex items-center justify-center '>
   <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 52.8C11.125 52.8 9.94833 52.3108 8.97 51.3325C7.99167 50.3542 7.50167 49.1767 7.5 47.8V12.8C7.5 11.425 7.99 10.2483 8.97 9.26999C9.95 8.29165 11.1267 7.80165 12.5 7.79999H32.5C33.2083 7.79999 33.8025 8.03999 34.2825 8.51999C34.7625 8.99999 35.0017 9.59332 35 10.3C35 11.0083 34.76 11.6025 34.28 12.0825C33.8 12.5625 33.2067 12.8017 32.5 12.8H12.5V47.8H47.5V27.8C47.5 27.0917 47.74 26.4983 48.22 26.02C48.7 25.5417 49.2933 25.3017 50 25.3C50.7083 25.3 51.3025 25.54 51.7825 26.02C52.2625 26.5 52.5017 27.0933 52.5 27.8V47.8C52.5 49.175 52.0108 50.3525 51.0325 51.3325C50.0542 52.3125 48.8767 52.8017 47.5 52.8H12.5ZM42.5 17.8H40C39.2917 17.8 38.6983 17.56 38.22 17.08C37.7417 16.6 37.5017 16.0067 37.5 15.3C37.5 14.5917 37.74 13.9983 38.22 13.52C38.7 13.0417 39.2933 12.8017 40 12.8H42.5V10.3C42.5 9.59165 42.74 8.99832 43.22 8.51999C43.7 8.04165 44.2933 7.80165 45 7.79999C45.7083 7.79999 46.3025 8.03999 46.7825 8.51999C47.2625 8.99999 47.5017 9.59332 47.5 10.3V12.8H50C50.7083 12.8 51.3025 13.04 51.7825 13.52C52.2625 14 52.5017 14.5933 52.5 15.3C52.5 16.0083 52.26 16.6025 51.78 17.0825C51.3 17.5625 50.7067 17.8017 50 17.8H47.5V20.3C47.5 21.0083 47.26 21.6025 46.78 22.0825C46.3 22.5625 45.7067 22.8017 45 22.8C44.2917 22.8 43.6983 22.56 43.22 22.08C42.7417 21.6 42.5017 21.0067 42.5 20.3V17.8ZM28.125 40.3L23.5 34.1125C23.25 33.7792 22.9167 33.6125 22.5 33.6125C22.0833 33.6125 21.75 33.7792 21.5 34.1125L16.5 40.8C16.1667 41.2167 16.125 41.6542 16.375 42.1125C16.625 42.5708 17 42.8 17.5 42.8H42.5C43 42.8 43.375 42.5708 43.625 42.1125C43.875 41.6542 43.8333 41.2167 43.5 40.8L36.625 31.6125C36.375 31.2792 36.0417 31.1125 35.625 31.1125C35.2083 31.1125 34.875 31.2792 34.625 31.6125L28.125 40.3Z" fill="white"/>
</svg>
   </div>

        <input {...getInputProps()} />
        <p className='text-center text-white mb-3'>Drag & drop or select file from your computer</p>
        <button type="button" onClick={open} className="bg-black-ops text-rose rounded-[40px] py-3 px-6 w-[193px] block hover:cursor-custom-cursor hover:border-rose transition-all duration-300 ease-in-out">
          Chose File
        </button>
      </div>
      <div className="mt-4">
        {acceptedFiles.length > 0 ? (
          <div>
            <h4 className='text-white text-center'>File Selected:</h4>
            <ul>
              {acceptedFiles.map((file) => (
                <li key={file.name} className='text-white text-center'>
                  {file.name} - {file.size} bytes
                </li>
              ))}
            </ul>
          </div>
        ) : null }
    </div>
    </div>
    
  );
}
