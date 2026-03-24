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

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
