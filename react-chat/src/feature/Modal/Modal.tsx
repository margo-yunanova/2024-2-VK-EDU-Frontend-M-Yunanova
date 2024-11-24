import { FC, useEffect, useRef, useState } from 'react';

import styles from './Modal.module.scss';
import { IModalProps } from './Modal.props';

export const Modal: FC<IModalProps> = ({ children, isOpen, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} className={styles.modal}>
      {onClose && <button onClick={handleCloseModal}>Close</button>}
      {children}
    </dialog>
  );
};
/******  5ef5fecf-3bde-487e-a007-0cc6bda8920d  *******/
