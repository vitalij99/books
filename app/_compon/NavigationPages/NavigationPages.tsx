import { Box, Link } from '@mui/material';

interface Navigate {
  nextPage?: string;
  nextText?: string;
  prevPage?: string;
  prevText?: string;
}

const NavigationPages = ({ navigate }: { navigate: Navigate }) => {
  const { nextPage, nextText, prevPage, prevText } = navigate;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
      {prevPage && <Link href={prevPage}>{prevText}</Link>}
      {nextPage && <Link href={nextPage}>{nextText}</Link>}
    </Box>
  );
};

export default NavigationPages;
