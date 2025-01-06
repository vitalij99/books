import { textShorten } from '@/lib/books';
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

const NavigationPages = ({
  navigate,
  title,
  charpter,
  bookHref,
  web,
}: NavigationPagesProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
      {navigate.prevPage && (
        <Link href={navigate.prevPage}>
          {!navigate.prevText ? 'Попередня' : textShorten(navigate.prevText)}
        </Link>
      )}
      <Link href={`/book/${bookHref}?web=${web}`}>
        {textShorten(title)} параграф {textShorten(charpter)}
      </Link>
      {navigate.nextPage && (
        <Link href={navigate.nextPage}>
          {!navigate.nextText ? 'Наступна' : textShorten(navigate.nextText)}
        </Link>
      )}
    </Box>
  );
};

export default NavigationPages;
