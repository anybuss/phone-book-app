import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <button onClick={onClose} className="float-right font-bold">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
