export interface IContactCard {
  id: string;
  avatar: string | null | undefined;
  firstName: string;
  lastName: string;
  isOnline: boolean;
  lastOnlineAt: string;
  onClick?: () => void;
  checked?: boolean;
}
