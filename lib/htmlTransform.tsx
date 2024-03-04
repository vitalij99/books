import { parse } from 'node-html-parser';

export const transformInHtml = ({
  html,
  elem,
  wrappFirst = '<body',
  wrappLast = '</body>',
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

    const finalHtml = trimmedHtml.substring(0, endIndex + wrappLast.length);

    const root = parse(finalHtml);

    const elements = root.querySelectorAll(elem);

    return elements;
  } else {
    const root = parse(html);

    const elements = root.querySelectorAll(elem);

    return elements;
  }
};
