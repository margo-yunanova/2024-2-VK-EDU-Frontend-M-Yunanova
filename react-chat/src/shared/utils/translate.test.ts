import { afterEach, describe, expect, test, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

import { ITranslatedResponse, translate } from './translate';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('translate', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  const response: ITranslatedResponse = {
    responseData: {
      translatedText: 'Привет мир!',
    },
  };

  test('should call fetch', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(response), {
      status: 200,
    });

    const result = await translate('Hello world', 'en', 'ru');

    expect(fetchMock).toBeCalledTimes(1);
    expect(result).toBe('Привет мир!');
  });

  test('should call fetch with correct search params', async () => {
    fetchMock.mockResponse(JSON.stringify(response), {
      status: 200,
    });

    const result = await translate('Hello world', 'en', 'ru');

    const result2 = await translate('Hello ', 'en', 'ru');

    expect(fetchMock).toBeCalled();
    expect(fetchMock).toBeCalledWith(
      'https://api.mymemory.translated.net/get?q=Hello+world&langpair=en%7Cru',
    );
    expect(fetchMock).toMatchSnapshot();
    expect(result).toBe('Привет мир!');
    expect(result2).toBe('Привет мир!');
  });
});
