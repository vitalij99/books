import Container from '@/app/_compon/Container/Container';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
