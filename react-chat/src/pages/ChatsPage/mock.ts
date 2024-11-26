import { MessageStatus } from '../ChatPage/mock';

export const chatData = [
  {
    id: 1,
    name: 'Крош',
    lastMessage:
      'Ёжик, ты опять где-то заныкался? Ну давай, вылезай, приключения ждут!',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.sent,
    unreadCount: 99,
    avatar:
      'https://i.pinimg.com/736x/30/a7/a1/30a7a1bd148ece83421208901ef80622.jpg',
  },
  {
    id: 2,
    name: 'Бараш',
    lastMessage: 'Без меня сегодня... Я в депрессии. Опять.',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.read,
    unreadCount: 0,
    avatar:
      'https://i.pinimg.com/236x/86/cd/b7/86cdb7dcbde410c87a9ec622edc5604d.jpg',
  },
  {
    id: 3,
    name: 'Лосяш',
    lastMessage:
      'Карыч, ты где? Нам нужно срочно обсудить последние научные открытия!',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.read,
    unreadCount: 0,
    avatar:
      'https://c0.klipartz.com/pngpicture/498/474/sticker-png-losyash-krosh-childhood-graphy-%D1%81%D0%BC%D0%B5%D1%88%D0%B0%D1%80%D0%B8%D0%BA%D0%B8-child-photography-orange-snout-deer.png',
  },
  {
    id: 4,
    name: 'Нюша',
    lastMessage: 'Ну что, Крош, ты идешь со мной на вечеринку? Я уже готова!',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.read,
    unreadCount: 0,
    avatar: 'https://ru.wikifur.com/w/images/5/54/%D0%9D%D1%8E%D1%88%D0%B0.jpg',
  },
  {
    id: 5,
    name: 'Совунья',
    lastMessage: 'Крош, ты же на зарядку не забыл? Это же основа здоровья!',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.sent,
    unreadCount: 199,
    avatar: 'https://cdn1.flamp.ru/b8055f9c2191c31f5e9332f14ef4e32a.jpg',
  },
  {
    id: 6,
    name: 'Карыч',
    lastMessage: 'img_12-12-09 (снимок для моей новой коллекции воспоминаний).',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.sent,
    unreadCount: 0,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-aIxFmQKRVgJLR6GLNO5Uqy_VHtjjXNcyQ&s',
  },
  {
    id: 7,
    name: 'Пин',
    lastMessage:
      'Может, проверим наши новые изобретения? Я тут кое-что усовершенствовал!',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.read,
    unreadCount: 0,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_37HEs4WQaYqw5YeGW7vXPlx6yv9MtHC_Q&s',
  },
  {
    id: 8,
    name: 'Ёжик',
    lastMessage: 'Крош, я тут! Давай что-нибудь придумаем.',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.read,
    unreadCount: 0,
    avatar:
      'https://png.klev.club/uploads/posts/2024-06/png-klev-club-acpw-p-yezhik-iz-smesharikov-png-3.png',
  },
  {
    id: 9,
    name: 'Копатыч',
    lastMessage: 'Ну что, кто со мной на огород? Урожай собирать пора!',
    timestamp: new Date('2024-10-01T14:30:00'),
    status: MessageStatus.sent,
    unreadCount: 10,
    avatar:
      'https://png.klev.club/uploads/posts/2024-04/png-klev-club-yhbj-p-kopatich-png-15.png',
  },
];
