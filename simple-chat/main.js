import './style.css';
import icon from './images/done_all.svg';
import { vacationChat } from './mock';

const form = document.querySelector('form');
const formMessage = form.querySelector('.form__message');
const input = formMessage.querySelector('.form-input');
const mirrorInput = formMessage.querySelector('.form-input-mirror-text');
const messages = document.querySelector('.messages');

const messageTemplate = document
  .querySelector('#message-template')
  .content.querySelector('.message');

input.addEventListener('input', (event) => {
  mirrorInput.textContent = event.target.value;
  input.style.height = mirrorInput.offsetHeight + 'px';
});

const createMessage = ({ id, type, sender, message, timestamp, status }) => {
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
    messageElement.querySelector('.message-status').src = icon;
  }

  return messageElement;
};

for (const message of vacationChat) {
  messages.append(createMessage(message));
}
