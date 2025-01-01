import { NavigateNext } from '@mui/icons-material';
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

import { useForm } from '@/shared/hooks/useForm';
import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { ROUTES } from '@/shared/routes/ROUTES';
import { ContactCard } from '@/shared/ui/ContactCard/ContactCard';
import { CreatingChatButton } from '@/shared/ui/CreatingChatButton/CreatingChatButton';
import { Loader } from '@/shared/ui/Loader/Loader';
import { getInitials } from '@/shared/utils/utils';
import {
  useChatsCreateMutation,
  UserRead,
  useUsersListQuery,
} from '@/store/api';

import { CreatingChatHeader } from '../../shared/ui/CreatingChatHeader/CreatingChatHeader';
import styles from './CreatingGroupChatPage.module.scss';
import { GroupChatCreationModal } from './ui/GroupChatCreationModal/GroupChatCreationModal';

export const CreatingGroupChatPage = () => {
  useWindowTitle('Creating public chat');

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const [selectedMembers, setSelectedMembers] = useState<UserRead[]>([]);
  const selectedMembersId = selectedMembers.map((member) => member.id);
  const [isModalActive, setModalActive] = useState(false);
  const { formData, handleChange } = useForm<{ [key: string]: string }>({});

  const { data, isLoading } = useUsersListQuery({
    page: 1,
    pageSize: 100,
    search: debouncedSearchValue,
  });

  const [createChat, { data: newChat, error }] = useChatsCreateMutation();

  const membersWithIsChecked =
    data?.results.map((user) => ({
      ...user,
      checked: selectedMembersId.includes(user.id),
    })) ?? [];

  const navigate = useNavigate();

  const handleCreateChat = () => {
    if (!isModalActive) {
      setModalActive(true);
      return;
    }

    createChat({
      fallback: 'on',
      body: {
        is_private: false,
        avatar: null,
        members: selectedMembersId,
        title: formData.title,
      },
    });
    setModalActive(false);
  };

  useEffect(() => {
    if (error) {
      Object.entries(
        (error as { data: { [key: string]: string[] } }).data,
      ).forEach(([key, value]) => {
        toast.error(`${key}: ${value.join('\n')}`);
      });
    }
  }, [error]);

  useEffect(() => {
    if (newChat) {
      setSearchValue('');
      navigate(`/${ROUTES.CHAT(newChat.id)}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChat]);

  const handleSelectContact = (member: UserRead, isChecked: boolean) => {
    setSelectedMembers((members) => {
      if (isChecked) {
        return members.filter((m) => m.id !== member.id);
      }

      return [...members, member];
    });
    setSearchValue('');
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateChat();
    }
  };

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    handleCreateChat();
  };

  return (
    <>
      {isLoading && <Loader />}

      <CreatingChatHeader value={searchValue} setValue={setSearchValue} />
      <ul className={styles.selectedMembers}>
        {selectedMembers.map((member) => (
          <button
            key={member.id}
            className={styles.member}
            onClick={() => handleSelectContact(member, true)}
          >
            {member.avatar ? (
              <img className={styles.avatar} src={member.avatar} alt="avatar" />
            ) : (
              <div className={styles.avatar}>
                {getInitials(member.first_name + ' ' + member.last_name)}
              </div>
            )}

            <span>
              {member.first_name} {member.last_name}
            </span>
          </button>
        ))}
      </ul>
      <ul className={styles.contacts}>
        {membersWithIsChecked.map((member) => (
          <li key={member.id}>
            <ContactCard
              id={member.id}
              avatar={member.avatar}
              firstName={member.first_name}
              lastName={member.last_name}
              isOnline={member.is_online}
              lastOnlineAt={member.last_online_at}
              onClick={() => handleSelectContact(member, member.checked)}
              checked={member.checked}
            />
          </li>
        ))}
      </ul>
      <div className={styles['creating-chat']}>
        {isModalActive && (
          <GroupChatCreationModal
            onChange={handleChange}
            title={formData?.title}
            onKeyDown={handleKeyDown}
          />
        )}
        <CreatingChatButton onClick={handleClick}>
          <NavigateNext />
        </CreatingChatButton>
      </div>
    </>
  );
};
