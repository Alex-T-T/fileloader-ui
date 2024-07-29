
'use client';

import { useEffect, useState } from 'react';
import { filesApi } from '../helpers/api/filesAPI';
import AddButton from './components/AddButton';
import Gallery from './components/Gallery';
import Search from './components/Search';
import TitleBlock from './components/TitleBlock';
import Dialog from '../components/Dialog';
import Modal from './components/Modal';
import { Title } from '../components/Title';

export default function Files() {
  const [files, setFiles] = useState<IFile[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const limit = 12;

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const res = await filesApi.getAllFiles({ limit, currentPage, search: searchQuery });
        setFiles(res.files);
        setTotalCount(res.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFileSelect = (file: File, title: string, description: string) => {
    setSelectedFile(file);
    setFileTitle(title);
    setFileDescription(description);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      await filesApi.uploadFile(selectedFile, fileTitle, fileDescription);
      setIsOpenModal(false);
      handleCancel();
      setCurrentPage(1);
      const fetchFiles = async () => {
        setIsLoading(true);
        try {
          const res = await filesApi.getAllFiles({ limit, currentPage, search: searchQuery });
          setFiles(res.files);
          setTotalCount(res.total);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchFiles();
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
      {totalCount > 0  ? <Gallery data={files} total={totalCount} currentPage={currentPage} isLoading={isLoading} onPageChange={setCurrentPage} /> : <Title isMainTitle className='text-white text-center'>There are no files yet. Start with + button.</Title>}
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
    </main>
  );
}