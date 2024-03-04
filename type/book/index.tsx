export enum AllowedKeys {
  FontSize = '--font-size',
  TextBook = '--text-book',
  BgColor = '--bg-color-book',
  BkPadding = '--book-padding',
}
export const READER_KEY = {
  voice: 'voice',
  rate: 'rate',
  pitch: 'pitch',
  volume: 'volume',
  language: 'language',
};

export const STORAGE_KEY = [
  AllowedKeys.FontSize,
  AllowedKeys.TextBook,
  AllowedKeys.BgColor,
  AllowedKeys.BkPadding,
];
export interface Book {
  name: string;
  book: string;
  img: string;
}
export interface ListbooksProps {
  books: Book[];
  link?: string;
  web?: string;
}
export interface ListbooksLink {
  books: {
    book: string;
    name: string;
  }[];
  web: string;
  link: string;
}
