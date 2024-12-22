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

const isCoordsMessage = (text: string) => {
  const regex =
    /^https:\/\/www\.openstreetmap\.org\/#map=\d+\/[-+]?\d+\.\d+\/[-+]?\d+\.\d+$/;
  return regex.test(text);
};

export const getCoords = (text: string) => {
  if (!isCoordsMessage(text)) return null;

  const regex = /#map=\d+\/([-+]?\d+\.\d+)\/([-+]?\d+\.\d+)/;
  const coords = text.match(regex);
  return coords
    ? { latitude: Number(coords[1]), longitude: Number(coords[2]) }
    : null;
};
