import { Box, Link, Typography } from '@mui/material';

interface NavigationPagesProps {
  title: string;
  charpter: string;
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
}: NavigationPagesProps) => {
  const {
    nextPage,
    nextText = 'Наступна',
    prevPage,
    prevText = 'Попередня',
  } = navigate;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
      {prevPage && (
        <Link href={prevPage}>
          {prevText.length === 0 ? 'Наступна' : prevText}
        </Link>
      )}
      <Typography color="var(--text-book)">
        {title} параграф {charpter}
      </Typography>
      {nextPage && (
        <Link href={nextPage}>
          {nextText.length === 0 ? 'Попередня' : nextText}
        </Link>
      )}
    </Box>
  );
};

export default NavigationPages;
