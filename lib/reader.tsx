'use client';
import { READER_KEY } from '@/type/book';
import { getStorage } from './getStorage';
import { useEffect, useState } from 'react';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
}
// add rate and pitch
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
    pitch: 2,
    rate: 2,
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

  const handleChangeVoice = (name: string) => {
    const voice = voices.find(voice => voice.name === name);
    if (voice) {
      utterThis.voice = voice;
    }

    synth.speak(utterThis);
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
  };
};
