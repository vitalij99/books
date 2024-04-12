export enum AllowedKeys {
  FontSize = '--font-size',
  TextBook = '--text-book',
  BgColor = '--bg-color-book',
  BkPadding = '--book-padding',
  Translate = 'translate',
}
export const READER_KEY = {
  voice: 'voice',
  rate: 'rate',
  pitch: 'pitch',
  volume: 'volume',
  timer: 'timer',
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
export interface BooksSave {
  title: string;
  link: string;
  chapter?: string;
}
export const THEME = 'theme';

export interface TimerParams {
  timeSave: Date;
  timer: number;
  checked: boolean;
}

export interface InitParamsReader {
  pitch: number;
  rate: number;
  language: string;
  volume: number;
  timer: TimerParams;
  voice: string;
}

export const initParamsReader: InitParamsReader = {
  pitch: 2,
  rate: 2,
  language: '',
  volume: 1,
  voice: '',
  timer: {
    timeSave: new Date(),
    timer: 60,
    checked: false,
  },
};
export interface Isreade {
  read: boolean;
  pause: boolean;
}
export interface EndTimerProps {
  isreade: Isreade;
  paramsReader: InitParamsReader;
}
