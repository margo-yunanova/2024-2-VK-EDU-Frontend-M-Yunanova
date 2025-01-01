import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ICreatingChatButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
