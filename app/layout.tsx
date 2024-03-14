import './globals.css';
import type { Metadata } from 'next';

import Header from './_compon/Header/Header';
import DarkTranslateProvider from './_compon/DarkTranslateProvider/DarkTranslateProvider';
import { getCookies } from '@/lib/cookis';
import { THEME } from '@/type/book';

export const metadata: Metadata = {
  title: 'Books uk',
  description: 'Books uk',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getCookies(THEME);
  return (
    <html lang="uk">
      <body>
        <DarkTranslateProvider theme={theme}>
          <Header />
          {children}
        </DarkTranslateProvider>
      </body>
    </html>
  );
}
