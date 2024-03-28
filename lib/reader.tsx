'use client';
import { InitParamsReader, READER_KEY, initParamsReader } from '@/type/book';
import { getStorage, setStorage } from './getStorage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
  isreade: { read: boolean; pause: boolean };
  srcNextPage?: string;
}

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
      timer: JSON.parse(getStorage(READER_KEY.timer)) ?? initParamsReader.timer,
    };

    setParamsReader(prev => ({ ...prev, ...storage }));
  }, []);

  useEffect(() => {
    if (paragraf === -1 || !isreade.read || !paramsReader.timer.checked) return;
    const text = book[paragraf];
    const firstUtterThis = new SpeechSynthesisUtterance(text);

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
      changeText(paragraf + 1);
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

    if (book.length >= paragraf) {
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
    const timerStr = getStorage(READER_KEY.timer);
    if (!timerStr) return;
    const timer: {
      timeSave: Date;
      timer: number;
    } = JSON.parse(timerStr);
    if (!timer) return;

    const date1 = new Date(timer.timeSave);
    const date2 = new Date();

    if (date1 >= date2) {
      setParagraf(0);
    }
  }, []);
  if (!synth || !voices) {
    return;
  }

  const speak = (number = 0) => {
    if (!synth) {
      return;
    }
    handleChangeParagraf(number);
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
