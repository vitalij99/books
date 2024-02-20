'use client';
import { READER_KEY } from '@/type/book';
import { getStorage, handleChangeLocalStorage } from './getStorage';
import { useEffect, useState } from 'react';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
}

export const StartReader = ({ book, changeText }: StartReaderProps) => {
  const [synth, setSynth] = useState<SpeechSynthesis>();
  const [utterThis, setUtterThis] = useState<
    SpeechSynthesisUtterance | undefined
  >(undefined);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>(
    undefined
  );
  const [paragraf, setParagraf] = useState({
    p: -1,
    textLength: 0,
    allTextmass: 0,
  });

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
    };
    firstUtterThis.onerror = event => {
      changeText(-1);
    };
    setUtterThis(firstUtterThis);

    setSynth(firstSynth);
  }, [book, changeText]);

  if (!synth || !utterThis || !voices) {
    return;
  }

  const options = {
    language: getStorage(READER_KEY.voice) || '',
    pitch: Number(getStorage(READER_KEY.pitch)) || 2,
    rate: Number(getStorage(READER_KEY.rate)) || 2,
    reade: false,
    timer: 2,
    paragraf: 0,
  };

  const speak = () => {
    if (!synth || !utterThis) {
      return;
    }
    console.log(utterThis, synth);
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
      handleChangeLocalStorage(rate + '', READER_KEY.rate);
    } else if (pitch) {
      utterThis.pitch = pitch;
      handleChangeLocalStorage(pitch + '', READER_KEY.pitch);
    } else if (volume) {
      console.log(volume);
      utterThis.volume = volume;
      handleChangeLocalStorage(volume + '', READER_KEY.volume);
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
      handleChangeLocalStorage(voice.name, READER_KEY.voice);
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
