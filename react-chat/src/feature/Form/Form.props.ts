import { IMessageProps } from '@/entities/Message/Message.props';

export interface IFormProps {
  onSubmit: (message: IMessageProps) => void;
}
