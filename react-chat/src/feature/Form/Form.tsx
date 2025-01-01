import { Attachment, LocationOn, Mic, Send } from '@mui/icons-material';
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

import { Modal } from '../Modal/Modal';
import styles from './Form.module.scss';

const mimeType = 'audio/webm';

export const Form = () => {
  const { id } = useParams();
  const [onSubmit, { isLoading }] = useMessagesCreateMutation();
  const [inputHeight, setInputHeight] = useState(0);
  const input = useRef<HTMLTextAreaElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<
    'recording' | 'inactive' | 'paused'
  >('inactive');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

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

  const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;

    if (!files) return;

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

  const handleVoice = async () => {
    if (!('MediaRecorder' in window)) {
      alert('The MediaRecorder API is not supported in your browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(stream);
    } catch (err) {
      alert('There is no Microphone at your device.');
      console.error(err);
    }
  };

  const startVoiceRecording = async () => {
    handleVoice();
    if (!stream) return;
    mediaRecorder.current = new MediaRecorder(stream, {
      mimeType,
    });

    setRecordingStatus('recording');
    mediaRecorder.current.start(1000);

    const localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopVoiceRecording = () => {
    if (audioChunks.length === 0 || !mediaRecorder.current) return;

    setRecordingStatus('inactive');
    mediaRecorder.current?.stop();

    const audioBlob = new Blob(audioChunks, {
      type: mimeType,
    });
    mediaRecorder.current.onstop = () => {
      const formData = new FormData();
      formData.append('voice', audioBlob, 'file.ogg');
      formData.append('chat', id!);
      const message = {
        messageCreate: formData,
      };
      // TODO: пофиксить типы в swagger, при кодогенерации они не совпадают с реальными
      onSubmit(message as unknown as MessagesCreateApiArg);

      setAudioChunks([]);
    };
  };

  return (
    <>
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
          />
          <div ref={mirrorInput} className={styles['form-input-mirror-text']} />
        </div>

        <div className={styles.icons}>
          {input.current?.value?.trim() !== '' ? (
            <button
              className={styles.icon}
              type="submit"
              disabled={isLoading}
              aria-label="Send text message"
            >
              <Send />
            </button>
          ) : (
            <button
              className={styles.icon}
              type="button"
              onTouchStart={startVoiceRecording}
              onMouseDown={startVoiceRecording}
              aria-label="Start voice recording"
            >
              <Mic />
            </button>
          )}
          <button className={styles.icon} type="button">
            <label htmlFor="file" className={styles.file}>
              <Attachment />
              <input
                type="file"
                id="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFile}
                aria-label="Attach file"
              />
            </label>
          </button>

          <button
            className={styles.icon}
            type="button"
            onClick={handleGPS}
            aria-label="Send location"
          >
            <LocationOn />
          </button>
        </div>
      </form>
      <Modal
        isOpen={
          recordingStatus === 'recording' ||
          recordingStatus === 'paused' ||
          recordingStatus !== 'inactive'
        }
        onClose={() => setRecordingStatus('inactive')}
      >
        <div className={styles.modal}>
          Идет запись голосового сообщения.
          <button
            className={styles.icon}
            type="button"
            onClick={stopVoiceRecording}
            aria-label="Stop voice recording"
          >
            Send <Send />
          </button>
        </div>
      </Modal>
    </>
  );
};
