export enum AllowedKeys {
  FontSize = '--font-size',
  TextBook = '--text-book',
  BgColor = '--bg-color-book',
  BkPadding = '--book-padding',
  TextMargin = '--text-text-margin',
  Translate = 'translate',
}

export const STORAGE_KEY = [
  AllowedKeys.FontSize,
  AllowedKeys.TextBook,
  AllowedKeys.BgColor,
  AllowedKeys.BkPadding,
  AllowedKeys.TextMargin,
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
export interface BooksSave {
  title: string;
  link: string;
  chapter?: string;
}
export interface BooksSaveDB {
  id: string;
  title: string;
  link: string;
  web: string;
  chapter: string[] | undefined;
  image: string | null;
  userId: string;
  lastReadeChapter: string | null;
  createdAt: Date;
  updatedAt: Date;
}
[];

export const THEME = 'theme';
