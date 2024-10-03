import { Box, IconButton, Slider, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { ReaderProps } from '@/types/reader';
import React from 'react';

interface SliderParagrafProps {
  maxParagraf: number;
  handleChangeParagraf: (event: Event, value: any) => void;
  reader?: ReaderProps;
}

const SliderParagraf = ({
  reader,
  handleChangeParagraf,
  maxParagraf,
}: SliderParagrafProps) => {
  const handleChangeParagrafNextParagraf = (nextChange = false) => {
    if (!reader) return;

    const nextParagraf = nextChange ? reader.paragraf + 1 : reader.paragraf - 1;

    reader.handleChangeParagraf(nextParagraf);
  };

  return (
    <>
      <Typography>Параграф</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => handleChangeParagrafNextParagraf(false)}
          disabled={reader && reader.paragraf <= 0}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <Slider
          name="paragraf"
          onChange={handleChangeParagraf}
          min={0}
          step={1}
          max={maxParagraf}
          value={reader?.paragraf}
          valueLabelDisplay="auto"
        />
        <IconButton
          onClick={() => handleChangeParagrafNextParagraf(true)}
          disabled={reader?.paragraf === maxParagraf}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default SliderParagraf;
