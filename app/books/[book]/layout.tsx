import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: { book: string };
}): Promise<Metadata> {
  const title = params.book;
  return {
    title: title,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
