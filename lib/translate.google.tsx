import axios from 'axios';

const link =
  'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=uk&hl=uk&dt=t&dt=bd&dj=1&source=input';

export const translate = async (text: string) => {
  const encodeText = encodeURI(text);

  if (!encodeText) {
    console.log(encodeText, text);
    return text;
  }

  const { data } = await axios.get(`${link}&q=${encodeText}`);
  if (!data) undefined;

  const result = data.sentences.map(
    (textTrans: { trans: string }) => textTrans.trans
  );
  return result;
};
