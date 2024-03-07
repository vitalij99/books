import './globals.css';
import type { Metadata } from 'next';

import Header from './_compon/Header/Header';
import DarkTranslateProvider from './_compon/DarkTranslateProvider/DarkTranslateProvider';

export const metadata: Metadata = {
  title: 'Books uk',
  description: 'Books uk',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <DarkTranslateProvider>
          <Header />
          {children}
        </DarkTranslateProvider>
      </body>
    </html>
  );
}
