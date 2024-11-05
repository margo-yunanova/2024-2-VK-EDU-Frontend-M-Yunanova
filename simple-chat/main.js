import './index.css';

import iconRead from './images/done_all.svg';
import iconSent from './images/check.svg';
import { vacationChat } from './mock';
import { createRipple } from './scripts/utils';

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
const arrowBackButton = document.querySelector('.arrow-back');
const searchButton = document.querySelector('.search');
const menuButton = document.querySelector('.menu');

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

  const text = input.value.trim();

  if (text === '') return;

  const message = {
    id: chatMessages.length + 1,
    type: 'input',
    sender: 'Бараш',
    message: text,
    timestamp: new Date(),
    status: 'sent',
  };
  chatMessages.push(message);
  localStorage.setItem('chat', JSON.stringify(chatMessages));
  input.value = '';
  mirrorInput.textContent = '';
  submitButton.classList.add('icon-send_disabled');

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

searchButton.addEventListener('click', (e) => {
  createRipple(e, () => {});
});

menuButton.addEventListener('click', (e) => {
  createRipple(e, () => {});
});

arrowBackButton.addEventListener('click', (e) => {
  createRipple(e, () => {
    window.location.href = './pages/chats.html';
  });
});

input.addEventListener('input', (event) => {
  const text = event.target.value.trim();

  if (text === '') {
    submitButton.classList.add('icon-send_disabled');
    input.value = '';
    return;
  }

  submitButton.classList.remove('icon-send_disabled');

  mirrorInput.textContent = text;
  const isFinishedEnter = text.endsWith('\n');

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
