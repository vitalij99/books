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

  useEffect(() => {
    const firstSynth = window.speechSynthesis;

    const text = book.reduce((acum, text) => acum + text, '');
    const firstUtterThis = new SpeechSynthesisUtterance(text);

    firstUtterThis.addEventListener('boundary', (event: { charIndex: any }) => {
      const index = event.charIndex;
      changeText(index);
    });
    firstSynth.onvoiceschanged = event => {
      const firstVoices = firstSynth.getVoices();
      setVoices(firstVoices);
      console.log(event);
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

    synth.speak(utterThis);
  };

  const handleChangeParams = ({
    rate,
    pitch,
  }: {
    rate?: number;
    pitch?: number;
  }) => {
    if (!utterThis) {
      return;
    } else if (rate) {
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
// export const StartReader = ({ book, changeText }: StartReaderProps) => {
//   const [synth, setSynth] = useState<SpeechSynthesis | undefined>(undefined);
//   const [utterThis, setUtterThis] = useState<
//     SpeechSynthesisUtterance | undefined
//   >(undefined);
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[] | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     const firstSynth = window.speechSynthesis;

//     const text = book.reduce((acum, text) => acum + text, '');
//     const firstUtterThis = new SpeechSynthesisUtterance(text);

//     firstUtterThis.addEventListener('boundary', (event: { charIndex: any }) => {
//       const index = event.charIndex;
//       changeText(index);
//     });
//     firstSynth.onvoiceschanged = event => {
//       const firstVoices = firstSynth.getVoices();
//       setVoices(firstVoices);
//       console.log(event);
//     };
//     setUtterThis(firstUtterThis);
//     console.log(firstUtterThis);
//     setSynth(firstSynth);
//   }, [book, changeText]);

//   useEffect(() => {
//     console.log(voices);
//     if (!voices) {
//       return;
//     }
//     {
//       const options = {
//         language: getStorage(READER_KEY.voice) || '',
//         pitch: Number(getStorage(READER_KEY.pitch)) || 2,
//         rate: Number(getStorage(READER_KEY.rate)) || 2,
//         reade: false,
//         timer: 2,
//         paragraf: 0,
//       };
//       let firstVoice: SpeechSynthesisVoice;
//       for (let i = 0; i < voices.length; i++) {
//         if (voices[i].name === options.language) {
//           firstVoice = voices[i];
//           break;
//         }
//       }
//       setUtterThis(
//         prev =>
//           prev && {
//             ...prev,
//             pitch: options.pitch,
//             rate: options.rate,
//             voice: firstVoice,
//           }
//       );
//     }
//   }, [voices]);

//   if (!synth || !utterThis || !voices) {
//     return;
//   }

//   function speak() {
//     if (!synth || !utterThis) {
//       return;
//     }
//     console.log(utterThis);
//     synth.speak(utterThis);
//   }

//   const handleChangeParams = ({
//     rate,
//     pitch,
//   }: {
//     rate?: number;
//     pitch?: number;
//   }) => {
//     if (rate) {
//       setUtterThis(prev => prev && { ...prev, rate });
//     } else if (pitch) {
//       setUtterThis(prev => prev && { ...prev, pitch });
//     }
//   };
//   const handleChangeVoice = (name: string) => {
//     // const voice = voices.find(voice => voice.name === name);
//     // if (voice) {
//     //   utterThis.voice = voice;
//     // }
//   };

//   return {
//     synth,
//     utterThis,
//     speak,
//     voices,
//     voice: getStorage(READER_KEY.voice) || '',
//     handleChangeVoice,
//     handleChangeParams,
//   };
// };
