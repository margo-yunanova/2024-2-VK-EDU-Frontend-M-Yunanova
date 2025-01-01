import { ChangeEvent, KeyboardEvent } from 'react';

export interface IGroupChatCreationModal {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
