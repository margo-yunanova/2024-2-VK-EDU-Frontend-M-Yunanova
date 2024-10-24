import { Attachment, Send } from '@mui/icons-material';
import {
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IMessage, MessageStatus } from '@/pages/ChatPage/mock';

import styles from './Form.module.scss';
import { IFormProps } from './Form.props';

// TODO задизейблить кнопку отправить

export const Form: FC<IFormProps> = ({ onSubmit }) => {
  const [inputHeight, setInputHeight] = useState(0);
  const input = useRef<HTMLTextAreaElement>(null);

  const mirrorInput = useRef<HTMLDivElement>(null);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const text = e.target.value.trim();

    const isFinishedEnter = text.endsWith('\n');
    mirrorInput.current!.textContent = text + (isFinishedEnter ? ' ' : '');

    setInputHeight(mirrorInput.current!.offsetHeight);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const text = input.current!.value.trim();
    if (text === '') return;

    const message: IMessage = {
      id: uuidv4(),
      type: 'input',
      sender: 'Бараш',
      message: text,
      timestamp: new Date(),
      status: MessageStatus.sent,
    };

    input.current!.value = '';
    mirrorInput.current!.textContent = '';
    setInputHeight(0);

    onSubmit(message);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles['form-message']}>
        <textarea
          ref={input}
          autoComplete="off"
          spellCheck
          className={styles['form-input']}
          style={{ height: `${inputHeight}px` }}
          name="message-text"
          placeholder="Сообщение"
          typeof="text"
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        ></textarea>
        <div ref={mirrorInput} className={styles['form-input-mirror-text']} />
      </div>

      <button className={styles['icon-send']} type="submit">
        <Send />
      </button>

      <label htmlFor="file" className={styles.file}>
        <Attachment />
        <input type="file" id="file" hidden multiple />
      </label>
    </form>
  );
};
