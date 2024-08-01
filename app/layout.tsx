import './globals.css';
import type { Metadata } from 'next';

import Header from './_compon/Header/Header';
import DarkProvider from './Providers/DarkProvider';
import { getCookies } from '@/lib/cookis';
import { THEME } from '@/types/book';
import { Box } from '@mui/material';
import TranslateProvider from './Providers/TranslateProvider';
import SessionWrapper from '@/app/_compon/SessionWrapper/SessionWrapper';
import ReaderProvider from '@/app/Providers/ReaderProvider';

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
                <Box sx={{ paddingTop: '90px' }}>{children}</Box>
              </ReaderProvider>
            </DarkProvider>
          </TranslateProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
