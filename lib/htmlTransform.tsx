import { parse } from 'node-html-parser';

export const transformInHtml = ({
  html,
  elem,
  wrappFirst = '<main',
  wrappLast = '</main>',
}: {
  html: string;
  elem: string;
  wrappFirst?: string;
  wrappLast?: string;
}) => {
  const startIndex = html.indexOf(wrappFirst);

  if (startIndex !== -1) {
    const trimmedHtml = html.substring(startIndex);
    const endIndex = trimmedHtml.indexOf(wrappLast);

    if (endIndex !== -1) {
      const finalHtml = trimmedHtml.substring(0, endIndex + wrappLast.length);

      const root = parse(finalHtml);

      const cards = root.querySelectorAll(elem);
      const links = cards.map(item => item.querySelector('a'));

      return links.toString();
    }
  }
};
