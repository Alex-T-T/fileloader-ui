
'use client';

import { useEffect, useState } from 'react';
import { filesApi } from '../helpers/api/filesAPI';
import AddButton from './components/AddButton';
import Gallery from './components/Gallery';
import Search from './components/Search';
import TitleBlock from './components/TitleBlock';
import Dialog from '../components/Dialog';
import Modal from './components/Modal';
import toast, { Toaster } from 'react-hot-toast';


export default function Files() {
  const [files, setFiles] = useState<IFile[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const limit = 12;

  const MIN_FILE_SIZE = 1 * 1024;
  const MAX_FILE_SIZE = 7 * 1024 * 1024 * 1024;
  
  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const res = await filesApi.getAllFiles({ limit, currentPage, search: searchQuery });
      setFiles(res.files);
      setTotalCount(res.total);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFileSelect = (file: File, title: string, description: string) => {

    if (file.size < MIN_FILE_SIZE || file.size > MAX_FILE_SIZE)  {
      toast.error(`Error: File size must be between 1 KB and 7 GB.`)
      setSelectedFile(null);
      setFileTitle('');
      setFileDescription('');
      return
          }
    setSelectedFile(file);
    setFileTitle(title);
    setFileDescription(description);
  };


  const handleFileUpload = () => {
    if (selectedFile) {
      toast.loading('Uploading...');
      setIsOpenModal(false);
      const worker = new Worker(new URL('../helpers/workers/fileUploadWorker', import.meta.url));
      
      worker.postMessage({ 
        file: selectedFile, 
        title: fileTitle, 
        description: fileDescription, 
      });

      worker.onmessage = (event) => {
        const { success, result, error } = event.data;
        toast.dismiss();
        if (success) {
          setCurrentPage(1);
          fetchFiles()
          toast.success(`File ${result.name} successfully uploaded`);
        } else {
          error ? toast.error(`Error: ${error}`) : toast.error(`${result.message}`);
        }
        setIsLoading(false);
      };

      worker.onerror = (error) => {
        toast.dismiss();
        toast.error(`Worker error: ${error.message}`);
        setIsLoading(false);
      };
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
    setSelectedFile(null);
    setFileTitle('');
    setFileDescription('');
  };

  return (
    <main className="flex w-full min-h-screen flex-row-reverse justify-center gap-6 items-top p-24 bg-home">
      <AddButton onClick={() => setIsOpenModal(true)} />
      <div className="flex-1 w-full min-w-0">
        <Search onSearch={handleSearch} />
        <TitleBlock />
      <Gallery data={files} total={totalCount} currentPage={currentPage} isLoading={isLoading} onPageChange={setCurrentPage} /> 
      {/* : <Title isMainTitle className='text-white text-center'>There are no files yet. Start with + button.</Title> */}
  

      </div>
      {isOpenModal && (
        <Dialog
          title="Add File"
          isDialog={isOpenModal}
          onOk={handleFileUpload}
          onCancel={handleCancel}
        >
          <Modal onFileSelect={handleFileSelect} />
        </Dialog>
      )}
        <Toaster position="top-right"/>
    </main>
  );
}