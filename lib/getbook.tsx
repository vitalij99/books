'use server';

export async function getBook(link: string) {
  console.log('hello');
  const response = await fetch(link);
  const htmlData = await response.text();

  return htmlData;
}
export async function getBookPopular(link: string) {
  const response = await fetch(link);
  const html = await response.text();
  const startIndex = html.indexOf('<ul class="novel-list col6"');
  const trimmedHtml = html.substring(startIndex);
  const endIndex = trimmedHtml.indexOf('</ul>');

  if (endIndex !== -1) {
    const finalHtml = trimmedHtml.substring(0, endIndex + '</ul>'.length);

    return finalHtml;
  }
  return html;
}
