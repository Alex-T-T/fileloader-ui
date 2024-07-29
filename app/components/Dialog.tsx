import React from 'react';
import ReactDOM from 'react-dom';

interface DialogProps {
  title: string;
  isDialog: boolean;
  onOk?: () => void ;
  onCancel: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ title, isDialog, onOk, onCancel, children }) => {
  if (!isDialog) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-0 backdrop-brightness-75">
      <div className="bg-secondary rounded-lg p-6 w-full max-w-screen-md relative ">
      <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-white text-xl font-bold focus:outline-none hover:cursor-custom-cursor"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="text-m text-white font-bold mr-6 borderborder-transparent bg-home  rounded-[40px] w-[193px] p-3 transition-all duration-300 ease-in-out hover:cursor-custom-cursor hover:bg-button-hover active:bg-rose"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            className="text-m text-white font-bold bg-rose border border-transparent rounded-[40px] w-[193px] p-3 transition-all duration-300 ease-in-out hover:cursor-custom-cursor hover:bg-secondary hover:border-rose hover:text-rose"
          >
            Create
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;