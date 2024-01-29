export class SpeechReader {
  synth: SpeechSynthesis;
  options: {
    language: string;
    pitch: number;
    rate: number;
    reade: boolean;
    timer: number;
    paragraf: number;
  };
  book: string[];
  voices: SpeechSynthesisVoice[];
  constructor({ book }: { book: string[] }) {
    this.synth = window.speechSynthesis;
    this.options = {
      language: 'Microsoft Polina Online (Natural) - Ukrainian (Ukraine)',
      pitch: 2,
      rate: 2,
      reade: false,
      timer: 2,
      paragraf: 0,
    };
    this.voices = this.synth.getVoices();
    this.book = book;

    this.speak = this.speak.bind(this);
  }

  speak() {
    if (this.synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    } else if (this.book) {
      const textBook = this.book.reduce((acum, text) => acum + text, '');
      const utterThis = new SpeechSynthesisUtterance(textBook);

      utterThis.onerror = function () {
        console.error('SpeechSynthesisUtterance.onerror');
      };

      for (let i = 0; i < this.voices.length; i++) {
        if (this.voices[i].name === this.options.language) {
          utterThis.voice = this.voices[i];
          break;
        }
      }
      utterThis.pitch = this.options.pitch;
      utterThis.rate = this.options.rate;
      this.synth.speak(utterThis);
    }
  }
}
