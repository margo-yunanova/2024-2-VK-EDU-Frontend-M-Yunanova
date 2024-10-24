import './index.css';

import iconRead from './images/done_all.svg';
import iconSent from './images/check.svg';
import { vacationChat } from './mock';

let chatMessages = JSON.parse(localStorage.getItem('chat'));

const form = document.querySelector('form');
const formMessage = form.querySelector('.form__message');
const input = formMessage.querySelector('.form-input');
const mirrorInput = formMessage.querySelector('.form-input-mirror-text');
const messages = document.querySelector('.messages');
const messageTemplate = document
  .querySelector('#message-template')
  .content.querySelector('.message');
const submitButton = form.querySelector('.icon-send');

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

    switch (status) {
      case 'read':
        messageElement.querySelector('.message-status').src = iconRead;
        break;
      case 'sent':
        messageElement.querySelector('.message-status').src = iconSent;
        break;
    }
  }

  return messageElement;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const message = {
    id: chatMessages.length + 1,
    type: 'input',
    sender: 'Бараш',
    message: input.value,
    timestamp: new Date(),
    status: 'sent',
  };
  chatMessages.push(message);
  localStorage.setItem('chat', JSON.stringify(chatMessages));
  input.value = '';
  mirrorInput.textContent = '';

  input.style.removeProperty('height');

  messages.append(createMessage(message));
  messages.lastElementChild.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  });
};

const handleKeyPress = (e) => {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

submitButton.addEventListener('click', handleSubmit);

input.addEventListener('input', (event) => {
  mirrorInput.textContent = event.target.value;
  const isFinishedEnter = event.target.value.endsWith('\n');

  input.style.height = `calc(${mirrorInput.offsetHeight}px + ${isFinishedEnter ? 1.15 : 0}em)`;
});

const init = () => {
  if (!chatMessages || chatMessages.length === 0) {
    localStorage.setItem('chat', JSON.stringify(vacationChat));
    chatMessages = vacationChat;
  }

  for (const message of chatMessages) {
    messages.append(createMessage(message));
  }

  let lastReadMessageIndex = chatMessages.findIndex(
    (item) => item.status === 'sent' && item.type === 'output',
  );

  if (lastReadMessageIndex === -1) {
    lastReadMessageIndex = chatMessages.length - 1;
  }

  setTimeout(() => {
    messages.children[lastReadMessageIndex].scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, 0);
};

init();
