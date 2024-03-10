'use client';
import { READER_KEY } from '@/type/book';
import { getStorage, setStorage } from './getStorage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
  srcNextPage?: string;
}

export const StartReader = ({
  book,
  changeText,
  srcNextPage,
}: StartReaderProps) => {
  const [synth, setSynth] = useState<SpeechSynthesis>();
  const [utterThis, setUtterThis] = useState<
    SpeechSynthesisUtterance | undefined
  >(undefined);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>(
    undefined
  );
  const [timeOut, setTimeOut] = useState({ timer: 2, timeNow: new Date() });

  const router = useRouter();
  // add tineOut
  useEffect(() => {
    const firstSynth = window.speechSynthesis;

    const text = book.reduce((acum, text) => acum + text, '');
    const firstUtterThis = new SpeechSynthesisUtterance(text);

    firstUtterThis.onboundary = event => {
      const textIndex = event.charIndex;

      changeText(textIndex);
    };
    firstSynth.onvoiceschanged = event => {
      const firstVoices = firstSynth.getVoices();
      setVoices(firstVoices);
    };

    firstUtterThis.onend = event => {
      changeText(-1);
      if (srcNextPage) router.push(srcNextPage);
    };
    firstUtterThis.onerror = event => {
      changeText(-1);
    };
    setUtterThis(firstUtterThis);

    setSynth(firstSynth);
  }, [book, changeText, router, srcNextPage]);

  useEffect(() => {
    const timer = Number(getStorage(READER_KEY.timer)) || 2;

    setTimeOut(prev => ({ ...prev, timer }));
  }, []);

  if (!synth || !utterThis || !voices) {
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
    if (!synth || !utterThis) {
      return;
    }

    synth.speak(utterThis);
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
    if (!utterThis) {
      return;
    } else if (rate) {
      utterThis.rate = rate;
      setStorage(rate + '', READER_KEY.rate);
    } else if (pitch) {
      utterThis.pitch = pitch;
      setStorage(pitch + '', READER_KEY.pitch);
    } else if (volume) {
      console.log(volume);
      utterThis.volume = volume;
      setStorage(volume + '', READER_KEY.volume);
    }
    if (synth.speaking) {
      synth.cancel();
      synth.speak(utterThis);
    }
  };
  const handleChangeVoice = (name: string) => {
    const voice = voices.find(voice => voice.name === name);
    if (voice) {
      utterThis.voice = voice;
      setStorage(voice.name, READER_KEY.voice);
    }
    if (synth.speaking) {
      synth.cancel();
      synth.speak(utterThis);
    }
  };

  return {
    synth,
    utterThis,
    speak,
    voices,
    voice: options.language,
    handleChangeVoice,
    handleChangeParams,
  };
};
