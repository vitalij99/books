export enum AllowedKeys {
  Translate = 'translate',
  HistoryBooks = 'historybooks',
}
export const MENUSTYLEDTEXT = 'MenuStyledText';

export interface InitTextStyledType {
  FontSize: string;
  TextBook: string;
  BgColor: string;
  BkPadding: string;
  TextMargin: string;
  TextLineHeight: string;
}
export type InitTextStyledKeys = keyof InitTextStyledType;
export const initTextStyled = {
  FontSize: '27',
  TextBook: '#000000',
  BgColor: '#ffffff',
  BkPadding: '6',
  TextMargin: '1',
  TextLineHeight: '1.5',
};
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
  firstPriority?: number;
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
export interface BookProps {
  book: string[];
  nav: {
    nextPage?: string;
    prevPage?: string;
    nextText?: string;
    prevText?: string;
  };
  title?: string;
}
export const THEME = 'theme';
