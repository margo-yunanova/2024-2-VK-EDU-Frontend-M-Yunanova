import { MessageType } from '@/entities/Message/Message.props';

export enum MessageStatus {
  sent = 'sent',
  read = 'read',
}

export interface IMessage {
  id: number;
  type: MessageType;
  sender: string;
  message: string;
  timestamp: Date;
  status: MessageStatus;
}

export const vacationChat: IMessage[] = [
  {
    id: 1,
    type: 'input',
    sender: 'Бараш',
    message: 'Привет! Ты уже решила, куда поедешь в отпуск?',
    timestamp: new Date('2024-09-15T10:00:00'),
    status: MessageStatus.read,
  },
  {
    id: 2,
    sender: 'Её звали Нюша',
    type: 'output',
    message: 'Привет! Да, думаю, поеду в Грецию. Давно мечтал там побывать.',
    timestamp: new Date('2024-09-15T10:01:15'),
    status: MessageStatus.read,
  },
  {
    id: 3,
    type: 'input',
    sender: 'Бараш',
    message:
      'О, Греция — классный выбор! Ты уже планировал, какие места посетишь?',
    timestamp: new Date('2024-09-15T10:02:30'),
    status: MessageStatus.read,
  },
  {
    id: 4,
    type: 'output',
    sender: 'Её звали Нюша',
    message:
      'Да, хочу съездить на остров Санторини. Там такие красивые виды, белоснежные дома на фоне моря. И, конечно, в Афины заеду — Акрополь давно хочу увидеть своими глазами.',
    timestamp: new Date('2024-09-15T10:04:00'),
    status: MessageStatus.read,
  },
  {
    id: 5,
    type: 'input',
    sender: 'Бараш',
    message: 'Звучит потрясающе! Ты уже билеты купил?',
    timestamp: new Date('2024-09-15T10:05:10'),
    status: MessageStatus.read,
  },
  {
    id: 6,
    type: 'output',
    sender: 'Её звали Нюша',
    message:
      'Билеты пока не купил, но смотрю варианты. Думаю, завтра уже оформлю всё. А ты как, тоже собираешься куда-нибудь?',
    timestamp: new Date('2024-09-15T10:06:25'),
    status: MessageStatus.read,
  },
  {
    id: 7,
    type: 'input',
    sender: 'Бараш',
    message:
      'Да, я планирую на Байкал поехать. Там природа потрясающая! Всегда мечтала увидеть озеро, и вот, кажется, наконец-то это случится.',
    timestamp: new Date('2024-09-15T10:08:00'),
    status: MessageStatus.read,
  },
  {
    id: 8,
    type: 'output',
    sender: 'Её звали Нюша',
    message:
      'Байкал — это супер! Я там был в прошлом году, и это место оставляет незабываемые впечатления. Обязательно прокатись на катере по озеру, виды просто космос.',
    timestamp: new Date('2024-09-15T10:09:30'),
    status: MessageStatus.read,
  },
  {
    id: 9,
    type: 'input',
    sender: 'Бараш',
    message:
      'Вот это совет, спасибо! Я как раз думала, чем заняться, когда туда доеду. Может, ты ещё что-то посоветуешь?',
    timestamp: new Date('2024-09-15T10:10:45'),
    status: MessageStatus.read,
  },
  {
    id: 10,
    type: 'output',
    sender: 'Её звали Нюша',
    message:
      'Конечно! Обязательно сходи в поход по местным тропам, особенно к Шаман-камню. И не забудь попробовать байкальскую рыбу. Копчёный омуль — это просто нечто.',
    timestamp: new Date('2024-09-15T10:12:10'),
    status: MessageStatus.read,
  },
  {
    id: 11,
    type: 'input',
    sender: 'Бараш',
    message:
      'Ого, я даже не знала про Шаман-камень. Звучит как что-то мистическое. А рыбу я люблю, обязательно попробую!',
    timestamp: new Date('2024-09-15T10:13:30'),
    status: MessageStatus.read,
  },
  {
    id: 12,
    type: 'output',
    sender: 'Её звали Нюша',
    message:
      'Тогда тебе точно понравится! Байкал — это место силы. Вроде бы спокойное озеро, но с каким-то особенным духом.',
    timestamp: new Date('2024-09-15T10:14:45'),
    status: MessageStatus.sent,
  },
  // {
  //   id: 13,
  //   type: 'input',
  //   sender: 'Бараш',
  //   message: 'Теперь жду поездку с нетерпением! Спасибо за советы :)',
  //   timestamp: new Date( '2024-09-15T10:16:00'),
  //   status: MessageStatus.read,
  // },
  {
    id: 14,
    type: 'output',
    sender: 'Её звали Нюша',
    message: 'Не за что!',
    timestamp: new Date('2024-09-15T10:17:20'),
    status: MessageStatus.sent,
  },
  {
    id: 15,
    type: 'output',
    sender: 'Её звали Нюша',
    message: 'Уверен, что тебе всё понравится.',
    timestamp: new Date('2024-09-15T10:17:20'),
    status: MessageStatus.sent,
  },
  {
    id: 16,
    type: 'output',
    sender: 'Её звали Нюша',
    message: 'Хорошего отпуска!',
    timestamp: new Date('2024-09-15T10:17:20'),
    status: MessageStatus.sent,
  },
];
