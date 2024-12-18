import { describe, expect, test } from 'vitest';

import { translate } from './translate';

describe('translate', () => {
  test('should return translated text', async () => {
    const response = await translate('Hello world', 'en', 'ru');
    expect(response).toBe('Привет мир!');
  });
});
