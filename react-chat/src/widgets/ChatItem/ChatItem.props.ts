import { LastMessageRead, UserRead } from '@/store/api';

export interface ChatItemProps {
  id?: string;
  title?: string;
  members: UserRead[];
  creator: UserRead;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  is_private: boolean;
  last_message: LastMessageRead;
}
