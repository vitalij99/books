import './globals.css';
import type { Metadata } from 'next';

import Header from './_compon/Header/Header';
import DarkTranslateProvider from './_compon/DarkTranslateProvider/DarkTranslateProvider';
import { getCookies } from '@/lib/cookis';
import { THEME } from '@/types/book';
import { Box } from '@mui/material';

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
          <Box sx={{ paddingTop: '90px' }}>{children}</Box>
        </DarkTranslateProvider>
      </body>
    </html>
  );
}
