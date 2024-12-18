// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

interface MemoizedFunction<T extends AnyFunction> extends CallableFunction {
  (...args: Parameters<T>): ReturnType<T>;
}

export const memoization = <T extends AnyFunction>(
  fn: T,
): MemoizedFunction<T> => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
};
