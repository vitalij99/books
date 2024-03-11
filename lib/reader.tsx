'use client';
import { READER_KEY } from '@/type/book';
import { getStorage, setStorage } from './getStorage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [paragraf, setParagraf] = useState(0);
  const [timeOut, setTimeOut] = useState({ timer: 2, timeSave: new Date() });

  const router = useRouter();

  useEffect(() => {
    const firstSynth = window.speechSynthesis;
    firstSynth.onvoiceschanged = event => {
      const firstVoices = firstSynth.getVoices();
      setVoices(firstVoices);
    };
    setSynth(firstSynth);
  }, []);

  useEffect(() => {
    const text = book[paragraf];
    const firstUtterThis = new SpeechSynthesisUtterance(text);

    const speakParagrap = () => {
      if (!synth) {
        return;
      }

      synth.speak(firstUtterThis);
    };

    setUtterThis(firstUtterThis);
    if (book.length > paragraf && paragraf !== -1) {
      speakParagrap();
    }
  }, [book, paragraf, synth]);

  useEffect(() => {
    const timer = Number(getStorage(READER_KEY.timer)) || 60;

    const timeSave = new Date();
    timeSave.setMinutes(timer);

    setTimeOut({ timer: 2, timeSave });
  }, []);

  if (!synth || !utterThis || !voices) {
    return;
  }
  utterThis.onend = event => {
    setParagraf(prev => (prev += 1));
    changeText(paragraf + 1);
  };
  utterThis.onerror = event => {
    changeText(-1);
  };

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
    changeText(paragraf);

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

  const handleCancel = () => {
    if (!synth) return;
    synth.cancel();
    changeText(-1);
    setParagraf(-1);
  };

  return {
    synth,
    utterThis,
    speak,
    voices,
    handleCancel,
    handleChangeVoice,
    handleChangeParams,
  };
};
