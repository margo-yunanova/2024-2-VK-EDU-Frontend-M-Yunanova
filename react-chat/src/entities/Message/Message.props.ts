export type MessageStatus = 'read' | 'sent';
export type MessageType = 'input' | 'output';

export interface IMessageProps {
  message: string;
  timestamp: string;
  status: MessageStatus;
  type: MessageType;
}
