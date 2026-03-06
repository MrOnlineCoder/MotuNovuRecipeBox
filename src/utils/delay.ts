export function delayedReturn<T>(ms: number, fn: () => T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, ms);
  });
}
