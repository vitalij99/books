import './globals.css';
import type { Metadata } from 'next';

import { getCookies } from '@/lib/cookis';
import { THEME } from '@/types/book';

import SessionWrapper from '@/app/_compon/SessionWrapper/SessionWrapper';
import ReaderProvider from '@/Providers/ReaderProvider';
import BreadcrumbsCustl from '@/app/_compon/Breadcrumbs/Breadcrumbs';
import Header from '@/app/_compon/Header/Header';
import DarkProvider from '@/Providers/DarkProvider';
import TranslateProvider from '@/Providers/TranslateProvider';

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
        <SessionWrapper>
          <TranslateProvider>
            <DarkProvider theme={theme}>
              <ReaderProvider>
                <Header />
                <BreadcrumbsCustl />
                {children}
              </ReaderProvider>
            </DarkProvider>
          </TranslateProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
