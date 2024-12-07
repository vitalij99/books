const linkGoogle =
  'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=uk&hl=uk&dt=t&dt=bd&dj=1&source=input';

export const translateGoogle = async (text: string) => {
  if (text.length === 0) return text;

  const regex = /[\p{L}]/u;

  if (!regex.test(text)) {
    return text;
  } else {
    const encodeText = encodeURI(text);

    if (!encodeText) {
      return text;
    }

    const data = await fetch(`${linkGoogle}&q=${encodeText}`);

    const textData = await data.json();

    if (!data) return;

    const result = textData.sentences.map(
      (textTrans: { trans: string }) => textTrans.trans
    );
    return result;
  }
};
