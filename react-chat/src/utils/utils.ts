type TLocale = 'ru' | 'US-en';

export const formateDate = (
  timestamp: string,
  locale: TLocale,
  options?: Intl.DateTimeFormatOptions,
) => new Intl.DateTimeFormat(locale, options).format(new Date(timestamp));
