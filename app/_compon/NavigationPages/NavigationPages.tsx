import Container from '@/app/_compon/Container/Container';
import { Box, Link } from '@mui/material';

interface NavigationPagesProps {
  title: string;
  charpter: string;
  bookHref: string;
  web?: string;
  navigate: {
    nextPage?: string;
    nextText?: string;
    prevPage?: string;
    prevText?: string;
  };
}
const textShorten = (text: string, num = 20) => {
  return text.length >= num ? text.slice(0, num) + '...' : text;
};
const NavigationPages = ({
  navigate,
  title,
  charpter,
  bookHref,
  web,
}: NavigationPagesProps) => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
        {navigate.prevPage && (
          <Link href={navigate.prevPage}>
            {!navigate.prevText ? 'Попередня' : textShorten(navigate.prevText)}
          </Link>
        )}
        <Link href={`/books/${bookHref}?web=${web}`}>
          {textShorten(title)} параграф {textShorten(charpter)}
        </Link>
        {navigate.nextPage && (
          <Link href={navigate.nextPage}>
            {!navigate.nextText ? 'Наступна' : textShorten(navigate.nextText)}
          </Link>
        )}
      </Box>
    </Container>
  );
};

export default NavigationPages;
