import { Attachment, LocationOn, Send } from '@mui/icons-material';
import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';

import { getOSMURL } from '@/shared/utils/utils';
import { MessagesCreateApiArg, useMessagesCreateMutation } from '@/store/api';

import styles from './Form.module.scss';

export const Form = () => {
  const { id } = useParams();
  const [onSubmit, { isLoading }] = useMessagesCreateMutation();
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

    const message = {
      messageCreate: {
        text,
        chat: id!,
      },
    };

    input.current!.value = '';
    mirrorInput.current!.textContent = '';
    setInputHeight(0);

    onSubmit(message);
  };

  const handleGPS = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const message = {
        messageCreate: {
          text: getOSMURL(latitude, longitude),
          chat: id!,
        },
      };

      onSubmit(message);
    });
  };

  const handleFile = (e) => {
    const { files } = e.target.files[0];
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    formData.append('chat', id!);
    const message = {
      messageCreate: formData,
    };
    // TODO: пофиксить типы в swagger, при кодогенерации они не совпадают с реальными
    onSubmit(message as unknown as MessagesCreateApiArg);

    e.target.value = '';
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

      <button
        className={styles['icon-send']}
        type="submit"
        disabled={isLoading}
      >
        <Send />
      </button>

      <label htmlFor="file" className={styles.file}>
        <Attachment />
        <input type="file" id="file" hidden multiple onChange={handleFile} />
      </label>

      <button className={styles['icon-send']} type="button" onClick={handleGPS}>
        <LocationOn />
      </button>
    </form>
  );
};
