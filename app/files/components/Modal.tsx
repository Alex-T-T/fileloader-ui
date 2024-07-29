import React, { useState, useEffect } from 'react';
import { Dropzone } from './DropZone';

interface ModalProps {
  onFileSelect: (file: File, title: string, description: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (file) {
      onFileSelect(file, title, description);
    }
  }, [file, title, description]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      onFileSelect(file, title, description);
    }
  };

  return (
    <form className="flex flex-col bg-home p-6 rounded-xl" onSubmit={handleSubmit}>
      <Dropzone onFileSelect={handleFileSelect} />
      <label className="mb-3 text-white">Title</label>
      <input
        className="mb-6 p-3 rounded-xl border bg-transparent text-white focus:outline-none focus:border-rose"
        placeholder="Enter title of your file"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="mb-3 text-white">Description</label>
      <input
        className="mb-6 p-3 rounded-xl border bg-transparent text-white focus:outline-none focus:border-rose"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
};

export default Modal;