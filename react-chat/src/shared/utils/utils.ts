type TLocale = 'ru' | 'US-en';

// export enum MessageStatus {
//   sent = 'sent',
//   read = 'read',
// }

export const formateDate = (
  timestamp: Date,
  locale: TLocale,
  options?: Intl.DateTimeFormatOptions,
) => new Intl.DateTimeFormat(locale, options).format(new Date(timestamp));

export const getInitials = (title: string = '') => {
  if (!title) return '';
  return title
    .split(' ')
    .map((str) => str[0].toUpperCase())
    .join('');
};

export const getOSMURL = (latitude: number, longitude: number) =>
  `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
