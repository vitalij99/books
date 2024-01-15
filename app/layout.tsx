import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './_compon/header/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Books uk',
  description: 'Books uk',
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
  })
  {
  
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
