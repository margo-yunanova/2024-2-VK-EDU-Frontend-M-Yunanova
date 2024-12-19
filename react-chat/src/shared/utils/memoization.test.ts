import { afterEach, describe, expect, test, vi } from 'vitest';

import { memoization } from './memoization';
import { translate } from './translate';

describe('memoization', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should return memoized data', () => {
    const spy = vi.fn((a: number, b: number) => a + b);
    const memo = memoization(spy);

    expect(memo(1, 2)).toBe(3);
    expect(memo(1, 2)).toBe(3);

    expect(spy).toBeCalledTimes(1);

    expect(memo(3, 4)).toBe(7);
    expect(memo(1, 2)).toBe(3);
    expect(spy).toBeCalledTimes(2);
  });

  test('should memoized async functions', async () => {
    const spy = vi.fn(async (a: number, b: number) => a + b);
    const memo = memoization(spy);

    expect(await memo(1, 2)).toBe(3);
    expect(await memo(1, 2)).toBe(3);

    expect(spy).toBeCalledTimes(1);

    expect(await memo(3, 4)).toBe(7);
    expect(await memo(1, 2)).toBe(3);
    expect(spy).toBeCalledTimes(2);
  });

  test('should return translated text', async () => {
    const memoizedTranslate = memoization(translate);
    const response = await memoizedTranslate('Hello world', 'en', 'ru');
    expect(response).toBe('Привет мир!');
  });

  test('should call translate only once', async () => {
    vi.mock('./translate', { spy: true });

    const memoizedTranslate = memoization(translate);

    const response = await memoizedTranslate('Hello world', 'en', 'ru');
    expect(response).toBe('Привет мир!');

    const cacheResponse = await memoizedTranslate('Hello world', 'en', 'ru');
    expect(cacheResponse).toBe('Привет мир!');

    expect(translate).toBeCalledTimes(1);
  });
});
