import '../index.css';
import iconRead from '../images/done_all.svg';
import iconSent from '../images/check.svg';
import { chatData } from '../mock';

const chats = document.querySelector('.chats');
const chatsList = chats.querySelector('.chats__list');
const chatTemplate = document
  .querySelector('#chat-item-template')
  .content.querySelector('.chat-item');
const counterUnreadTemplate = document
  .querySelector('#counter-unread-template')
  .content.querySelector('.counter-unread');

const createChatItem = (chat) => {
  const chatElement = chatTemplate.cloneNode(true);
  chatElement.querySelector('.chat-item__avatar').src = chat.avatar;
  chatElement.querySelector('.chat-item__name').textContent = chat.name;
  chatElement.querySelector('.chat-item__last-message').textContent =
    chat.lastMessage;
  chatElement.querySelector('.chat-item__time').textContent =
    new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(chat.date));

  if (chat.unreadCount > 0) {
    const counterUnreadElement = counterUnreadTemplate.cloneNode(true);
    counterUnreadElement.querySelector('.counter-unread__text').textContent =
      chat.unreadCount;
    chatElement
      .querySelector('.chat-item__status')
      .append(counterUnreadElement);
  } else if (chat.status === 'read') {
    chatElement.querySelector('.chat-item__status-icon').src = iconRead;
  } else if (chat.status === 'sent') {
    chatElement.querySelector('.chat-item__status-icon').src = iconSent;
  }
  return chatElement;
};

for (const chat of chatData) {
  chatsList.append(createChatItem(chat));
}
