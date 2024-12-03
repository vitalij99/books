'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InitParamsReader, PARAMSREADER } from '@/types/reader';
import { getSrorageJSON } from '@/lib/getStorage';

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

    firstSynth.onvoiceschanged = () => {
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
    firstUtterThis.onend = () => {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
    const storage: InitParamsReader = getSrorageJSON(PARAMSREADER);

    if (storage && storage?.timer?.timeSave) {
      const dateSave = new Date(storage?.timer?.timeSave);
      const date2 = new Date();

      if (dateSave >= date2) {
        setParagraf(0);
      }
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
