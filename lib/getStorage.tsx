import { getRootValue } from './setRootValue';

export const getStorage = (key: string) => {
  return localStorage.getItem(key) || getRootValue(key);
};
