export async function startReade({ book }: { book: string[] }) {
  const synth = window.speechSynthesis;
  const options = {
    language: 'Google español',
    pitch: 2,
    rate: 2,
    reade: false,
    timer: 2,
    paragraf: 0,
  };

  const voices = synth.getVoices();

  function speak() {
    if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    } else if (book) {
      const textBook = book.reduce((acum, text) => acum + text, '');
      const utterThis = new SpeechSynthesisUtterance(textBook);

      utterThis.onerror = function () {
        console.error('SpeechSynthesisUtterance.onerror');
      };

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
}
