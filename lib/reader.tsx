'use client';
import { READER_KEY } from '@/type/book';
import { getStorage, handleChangeLocalStorage } from './getStorage';
import { useEffect, useState } from 'react';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
}

export const StartReader = ({ book, changeText }: StartReaderProps) => {
  const [synth, setfirst] = useState<SpeechSynthesis>();

  useEffect(() => {
    setfirst(window.speechSynthesis);
  }, []);
  if (!synth) {
    return;
  }
  const text = book.reduce((acum, text) => acum + text, '');
  const utterThis = new SpeechSynthesisUtterance(text);
  let voices = synth.getVoices();
  const options = {
    language: getStorage(READER_KEY.voice) || '',
    pitch: Number(getStorage(READER_KEY.pitch)) || 2,
    rate: Number(getStorage(READER_KEY.rate)) || 2,
    reade: false,
    timer: 2,
    paragraf: 0,
  };

  function speak() {
    if (!synth) {
      return;
    }

    if (voices.length === 0) {
      voices = synth.getVoices();
      return;
    } else if (text) {
      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === options.language) {
          utterThis.voice = voices[i];
          break;
        }
      }

      utterThis.pitch = options.pitch;
      utterThis.rate = options.rate;
      synth.speak(utterThis);
    }
  }

  const handleChangeParams = ({
    rate,
    pitch,
  }: {
    rate?: number;
    pitch?: number;
  }) => {
    if (rate) {
      utterThis.rate = rate;
      handleChangeLocalStorage(rate + '', 'rate');
    } else if (pitch) {
      utterThis.pitch = pitch;
      handleChangeLocalStorage(pitch + '', 'pitch');
    }
  };
  const handleChangeVoice = (name: string) => {
    const voice = voices.find(voice => voice.name === name);
    if (voice) {
      utterThis.voice = voice;
      handleChangeLocalStorage(voice.name, READER_KEY.voice);
    }
  };

  utterThis.addEventListener('boundary', event => {
    const index = event.charIndex;
    changeText(index);
  });
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
