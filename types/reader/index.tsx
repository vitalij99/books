export const PARAMSREADER = 'paramsReader';

export const READER_KEY = {
  voice: 'voice',
  rate: 'rate',
  pitch: 'pitch',
  volume: 'volume',
  timer: 'timer',
};
export interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
  srcNextPage?: string;
  autoScroll: {
    handleAutoScroll: () => void;
    isAutoScroll: boolean;
  };
}
export const initParamsReader: InitParamsReader = {
  pitch: 2,
  rate: 2,
  language: '',
  volume: 1,
  timer: {
    timeSave: new Date(),
    timer: 60,
    checked: false,
  },
};
export interface InitParamsReader {
  pitch: number;
  rate: number;
  language: string;
  volume: number;
  timer: TimerParams;
}

export interface TimerParams {
  timeSave: Date | undefined;
  timer: number;
  checked: boolean;
}
export interface IsreadeProprs {
  read: boolean;
  pause: boolean;
}
export interface ReaderProps {
  synth: SpeechSynthesis;
  speak: (number?: number) => void;
  voices: SpeechSynthesisVoice[];
  paragraf: number;
  handleCancel: () => void;
  handleChangeParagraf: (number?: number) => void;
}
