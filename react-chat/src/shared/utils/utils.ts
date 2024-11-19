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

export const getInitials = (title: string = '') =>
  title
    .split(' ')
    .map((str) => str[0].toUpperCase())
    .join('');
