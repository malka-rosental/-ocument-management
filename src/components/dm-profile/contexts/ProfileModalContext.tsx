import React, { useState, useContext, createContext } from 'react';

type ModalContextType = {
  selectedRow: any;
  setSelectedRow: (row: any) => void;
  openModal: (row: any) => void;
  closeModal: () => void;
  isModalOpen: boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (row: any) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ selectedRow, setSelectedRow, openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
