'use client';
import debounce from 'lodash.debounce';

export const getStorage = (key: string) => {
  const res = localStorage.getItem(key);

  return res ? res : '';
};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const setStorage = debounce((value: string | {} | [], key: string) => {
  if (typeof value !== 'string') {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.setItem(key, value);
}, 500);

export function getStorageAr(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
export const getSrorageJSON = (key: string) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : '';
  } catch (error) {
    console.warn(`Failed to parse JSON for key "${key}":`, error);
    return data;
  }
};
