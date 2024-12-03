export enum AllowedKeys {
  FontSize = '--font-size',
  TextBook = '--text-book',
  BgColor = '--bg-color-book',
  BkPadding = '--book-padding',
  TextMargin = '--text-text-margin',
  TextLineHeight = '--text-line-height',
  Translate = 'translate',
  HistoryBooks = 'historybooks',
}
export const MENUSTYLEDTEXT = 'MenuStyledText';

export const STORAGE_KEY = [
  AllowedKeys.FontSize,
  AllowedKeys.TextBook,
  AllowedKeys.BgColor,
  AllowedKeys.BkPadding,
  AllowedKeys.TextMargin,
  AllowedKeys.TextLineHeight,
];

export type StorageType = {
  [key in AllowedKeys]: string;
};
export interface Book {
  name: string;
  book: string;
  img: string;
}
export interface ListBooksCardProps {
  books: Book[];
  web?: string;
}
export interface ListBooksLinkProps {
  books:
    | {
        book: string;
        name: string;
      }[]
    | undefined;
  web: string;
  link: string;
}

export interface BookInfoType {
  title?: string;
  categories?: string[];
  image?: string;
  author?: string;
  status?: string;
  publishers?: string;
  tags?: string[];
  yearPublishing?: string;
  chapters?: string | number;
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
