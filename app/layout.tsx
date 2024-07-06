import './globals.css';
import type { Metadata } from 'next';

import Header from './_compon/Header/Header';
import DarkProvider from './_compon/DarkTranslateProvider/DarkProvider';
import { getCookies } from '@/lib/cookis';
import { THEME } from '@/types/book';
import { Box } from '@mui/material';
import TranslateProvider from './_compon/DarkTranslateProvider/TranslateProvider';

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
        <TranslateProvider>
          <DarkProvider theme={theme}>
            <Header />
            <Box sx={{ paddingTop: '90px' }}>{children}</Box>
          </DarkProvider>
        </TranslateProvider>
      </body>
    </html>
  );
}
