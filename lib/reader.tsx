'use client';
import { READER_KEY } from '@/type/book';
import { getStorage, setStorage } from './getStorage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
  isreade: { read: boolean; pause: boolean };
  srcNextPage?: string;
}
const initParamsReader = {
  pitch: 2,
  rate: 2,
  voice: '',
  volume: 1,
};
// add timeOut and initParams
export const StartReader = ({
  book,
  changeText,
  srcNextPage,
  isreade,
}: StartReaderProps) => {
  const [synth, setSynth] = useState<SpeechSynthesis>();

  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>(
    undefined
  );
  const [paragraf, setParagraf] = useState(-1);
  const [paramsReader, setParamsReader] = useState(initParamsReader);
  const [timeOut, setTimeOut] = useState({ timer: 2, timeSave: new Date() });

  const router = useRouter();

  useEffect(() => {
    const firstSynth = window.speechSynthesis;
    firstSynth.onvoiceschanged = event => {
      const firstVoices = firstSynth.getVoices();
      setVoices(firstVoices);
    };
    setSynth(firstSynth);
    const storage = {
      pitch: Number(getStorage(READER_KEY.pitch)) || 2,
      rate: Number(getStorage(READER_KEY.rate)) || 2,
      voice: getStorage(READER_KEY.voice) || '',
      volume: Number(getStorage(READER_KEY.volume)) || 1,
    };
    setParamsReader(storage);
  }, []);

  useEffect(() => {
    if (paragraf === -1 || !isreade.read) return;
    const text = book[paragraf];
    const firstUtterThis = new SpeechSynthesisUtterance(text);
    // storage params
    if (!voices) return;
    const voice = voices.find(voice => voice.name === paramsReader.voice);

    if (voice) {
      firstUtterThis.voice = voice;
    }
    firstUtterThis.rate = paramsReader.rate;
    firstUtterThis.pitch = paramsReader.pitch;
    firstUtterThis.volume = paramsReader.volume;
    firstUtterThis.onend = event => {
      setParagraf(prev => prev + 1);
      changeText(paragraf);
    };
    firstUtterThis.onerror = event => {
      changeText(-1);
    };

    const speakParagrap = () => {
      if (!synth) {
        return;
      }

      synth.speak(firstUtterThis);
    };

    if (book.length > paragraf) {
      speakParagrap();
    } else if (book.length < paragraf + 1) {
      srcNextPage && router.push(srcNextPage);
    }
  }, [
    book,
    changeText,
    isreade.read,
    paragraf,
    paramsReader,
    router,
    srcNextPage,
    synth,
    voices,
  ]);

  useEffect(() => {
    const timer = Number(getStorage(READER_KEY.timer)) || 60;

    const timeSave = new Date();
    timeSave.setMinutes(timer);

    setTimeOut({ timer: 2, timeSave });
  }, []);

  if (!synth || !voices) {
    return;
  }

  const options = {
    language: getStorage(READER_KEY.voice) || '',
    pitch: Number(getStorage(READER_KEY.pitch)) || 2,
    rate: Number(getStorage(READER_KEY.rate)) || 2,
    reade: false,
    paragraf: 0,
  };
  const speak = () => {
    if (!synth) {
      return;
    }
    handleChangeParagraf(paragraf);
  };
  const handleChangeParagraf = (number = 0) => {
    synth.cancel();

    setParagraf(number);
    changeText(number);
  };

  const handleChangeParams = ({
    rate,
    pitch,
    volume,
  }: {
    rate?: number;
    pitch?: number;
    volume?: number;
  }) => {
    if (rate) {
      setParamsReader(prev => ({ ...prev, rate }));
      setStorage(rate + '', READER_KEY.rate);
    } else if (pitch) {
      setParamsReader(prev => ({ ...prev, pitch }));
      setStorage(pitch + '', READER_KEY.pitch);
    } else if (volume) {
      setParamsReader(prev => ({ ...prev, volume }));
      setStorage(volume + '', READER_KEY.volume);
    }

    if (synth.speaking) {
      handleChangeParagraf(paragraf);
    }
  };
  const handleChangeVoice = (name: string) => {
    const voice = voices.find(voice => voice.name === name);
    if (voice) {
      setParamsReader(prev => ({ ...prev, voice: name }));
      setStorage(voice.name, READER_KEY.voice);
    }
    if (synth.speaking) {
      handleChangeParagraf(paragraf);
    }
  };

  const handleCancel = () => {
    if (!synth) return;
    synth.cancel();
    changeText(-1);
    setParagraf(-1);
  };

  return {
    synth,

    speak,
    voices,
    paragraf,
    handleCancel,
    handleChangeParagraf,
    handleChangeVoice,
    handleChangeParams,
  };
};
