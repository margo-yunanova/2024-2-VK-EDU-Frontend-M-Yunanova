import './style.css';
import iconRead from './images/done_all.svg';
import iconSent from './images/check.svg';
import { vacationChat } from './mock';

let chatMessages = JSON.parse(localStorage.getItem('chat'));

if (!chatMessages || chatMessages.length === 0) {
  localStorage.setItem('chat', JSON.stringify(vacationChat));
  chatMessages = vacationChat;
}

const form = document.querySelector('form');
const formMessage = form.querySelector('.form__message');
const input = formMessage.querySelector('.form-input');
const mirrorInput = formMessage.querySelector('.form-input-mirror-text');
const messages = document.querySelector('.messages');
const messageTemplate = document
  .querySelector('#message-template')
  .content.querySelector('.message');

const createMessage = ({ type, message, timestamp, status }) => {
  const messageElement = messageTemplate.cloneNode(true);

  messageElement.querySelector('.message-text').textContent = message;
  messageElement.querySelector('.message-time').textContent =
    new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(timestamp));

  if (type === 'input') {
    messageElement.classList.add('message_input');
  }

  if (type === 'input' && status === 'read') {
    messageElement.querySelector('.message-status').src = iconRead;
  }

  if (type === 'input' && status === 'sent') {
    messageElement.querySelector('.message-status').src = iconSent;
  }

  return messageElement;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const message = {
    id: chatMessages.length + 1,
    type: 'input',
    sender: 'Бараш',
    message: e.target.querySelector('.form-input').value,
    timestamp: new Date(),
    status: 'sent',
  };

  chatMessages.push(message);
  localStorage.setItem('chat', JSON.stringify(chatMessages));
  e.target.querySelector('.form-input').value = '';

  messages.style.height = `calc(100dvh - 60px - 56px)`;
  input.style.height = '34.5px';

  messages.append(createMessage(message));
  messages.lastElementChild.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  });
};

const handleKeyPress = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
};

const lastReadMessageIndex = chatMessages.findIndex(
  (item) => item.status === 'sent' && item.sender === 'Её звали Нюша',
);

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

input.addEventListener('input', (event) => {
  mirrorInput.textContent = event.target.value;
  input.style.height = mirrorInput.offsetHeight + 'px';
  messages.style.height = `calc(100dvh - 60px - ${formMessage.offsetHeight}px - 20px)`;
});

for (const message of chatMessages) {
  messages.append(createMessage(message));
}

messages.children[lastReadMessageIndex].scrollIntoView({
  block: 'end',
  behavior: 'smooth',
});
