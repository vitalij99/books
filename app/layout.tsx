import './globals.css';
import type { Metadata } from 'next';

import Header from './_compon/Header/Header';
import DarkProvider from './_compon/DarkProvider/DarkProvider';

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
        <DarkProvider>
          <Header />
          {children}
        </DarkProvider>
      </body>
    </html>
  );
}
