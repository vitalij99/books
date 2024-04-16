'use client';
import debounce from 'lodash.debounce';
import { getRootValue } from './setRootValue';
import { AllowedKeys } from '@/types/book';

export const getStorageRootValue = (key: string) => {
  return localStorage.getItem(key) || getRootValue(key);
};
export const getStorage = (key: string) => {
  const res = localStorage.getItem(key);

  return res ? res : '';
};
export const setStorage = debounce((value: string | {} | [], key: string) => {
  if (typeof value !== 'string') {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.setItem(key, value);
}, 500);
export const setPropertyStyle = debounce((value: string, key: AllowedKeys) => {
  localStorage.setItem(key, value);
  document.documentElement.style.setProperty(key, value);
}, 500);
