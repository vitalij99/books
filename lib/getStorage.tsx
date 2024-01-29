import { getRootValue } from './setRootValue';

export const getStorageRootValue = (key: string) => {
  return localStorage.getItem(key) || getRootValue(key);
};
export const getStorage = (key: string) => {
  return localStorage.getItem(key) || '';
};
