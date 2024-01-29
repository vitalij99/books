import { READER_KEY } from '@/type/book';
import { getStorage } from './getStorage';

export const startReader = ({ book }: { book: string[] }) => {
  const synth = window.speechSynthesis;
  const text = book.reduce((acum, text) => acum + text, '');
  const utterThis = new SpeechSynthesisUtterance(text);
  const options = {
    language: getStorage(READER_KEY.voice) || '',
    pitch: 2,
    rate: 2,
    reade: false,
    timer: 2,
    paragraf: 0,
  };
  let voices = synth.getVoices();
  function speak() {
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

      console.log(voices);
      utterThis.pitch = options.pitch;
      utterThis.rate = options.rate;
      synth.speak(utterThis);
    }
  }
  return { synth, utterThis, speak, voices };
};
