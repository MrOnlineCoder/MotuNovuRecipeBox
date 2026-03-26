import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollSmoothTo(element: HTMLElement | null) {
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}

export function delayedReturn<T>(ms: number, fn: () => T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, ms);
  });
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function makeMultiCriteriaSorter<T>(
  criteria: {
    key: keyof T;
    order?: 'asc' | 'desc';
  }[],
) {
  return (a: T, b: T) => {
    for (const item of criteria) {
      const criterion = item.key;
      const orderMultiplier = item.order === 'desc' ? -1 : 1;

      const isString =
        typeof a[criterion] === 'string' && typeof b[criterion] === 'string';

      if (isString) {
        const comparison = (a[criterion] as string).localeCompare(
          b[criterion] as string,
        );

        return comparison !== 0 ? comparison * orderMultiplier : 0;
      }

      const aValue = a[criterion] as unknown as number;
      const bValue = b[criterion] as unknown as number;

      return (aValue - bValue) * orderMultiplier;
    }
    return 0;
  };
}

export function makeCaseInsensitiveSearchFilterer<T>(
  query: string,
  keysToSearch: (keyof T)[],
) {
  return (item: T) => {
    if (!query) return true;

    const q = query.toLowerCase();

    return keysToSearch.some((key) => {
      const value = item[key];

      if (typeof value === 'string') {
        return value.toLowerCase().includes(q);
      }

      if (Array.isArray(value)) {
        return value.some(
          (v) => typeof v === 'string' && v.toLowerCase().includes(q),
        );
      }

      return false;
    });
  };
}

export const fileToBase64Url = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
