'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InitParamsReader, READER_KEY } from '@/types/reader';
import { getStorage } from '@/lib/getStorage';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
  isreade: { read: boolean; pause: boolean };
  srcNextPage?: string;
  paramsReader: InitParamsReader;
}

export const useStartReader = ({
  book,
  changeText,
  srcNextPage,
  isreade,
  paramsReader,
}: StartReaderProps) => {
  const [synth, setSynth] = useState<SpeechSynthesis>();

  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>(
    undefined
  );
  const [paragraf, setParagraf] = useState(-1);

  const router = useRouter();

  useEffect(() => {
    const firstSynth = window.speechSynthesis;

    // 2 time get voices
    const firstVoices = firstSynth.getVoices();
    setVoices(firstVoices);

    firstSynth.onvoiceschanged = event => {
      const firstVoices = firstSynth.getVoices();
      setVoices(firstVoices);
    };

    setSynth(firstSynth);
  }, []);

  useEffect(() => {
    if (paragraf === -1 || !isreade.read || isreade.pause) return;

    const text = book[paragraf];
    const firstUtterThis = new SpeechSynthesisUtterance(text);

    if (!voices) return;
    const voice = voices.find(voice => voice.name === paramsReader.language);

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

    const speakParagrap = () => {
      if (!synth) {
        return;
      }
      synth.cancel();
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
    isreade.pause,
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
    if (number >= 0 && number < book.length) {
      setParagraf(number);
      changeText(number);
    }
  };

  const handleCancel = () => {
    if (!synth) return;
    synth.cancel();
    changeText(-1);
  };

  return {
    synth,
    speak,
    voices,
    paragraf,
    handleCancel,
    handleChangeParagraf,
  };
};
