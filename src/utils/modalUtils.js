import React from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalContent, setModalContent] = React.useState('');

  const handleModalClose = () => {
    setShowModal(false);
    setModalTitle('');
    setModalContent('');
  };

  const handleOpenModal = (title, content) => {
    setShowModal(true);
    setModalTitle(title);
    setModalContent(content);
  };

  return {
    showModal,
    modalTitle,
    modalContent,
    handleModalClose,
    handleOpenModal,
  };
};