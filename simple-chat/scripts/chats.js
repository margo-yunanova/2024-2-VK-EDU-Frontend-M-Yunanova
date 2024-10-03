import '../index.css';
import { chatData } from '../mock';

const chats = document.querySelector('.chats');
const chatsList = chats.querySelector('.chats__list');
const chatTemplate = document
  .querySelector('#chat-item-template')
  .content.querySelector('.chat-item');

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
  chatElement.querySelector('.chat-item__status').textContent = chat.status;
  return chatElement;
};

for (const chat of chatData) {
  chatsList.append(createChatItem(chat));
}
