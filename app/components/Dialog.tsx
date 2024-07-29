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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-home rounded-lg p-6 w-full max-w-screen-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="text-m text-white font-bold borderborder-transparent bg-home  rounded-[40px] w-[193px] p-3"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            className="text-m text-white font-bold bg-rose border border-transparent rounded-[40px] w-[193px] p-3"
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