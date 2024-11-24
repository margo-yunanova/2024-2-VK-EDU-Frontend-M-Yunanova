export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}
