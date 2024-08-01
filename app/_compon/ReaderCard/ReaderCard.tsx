import { Box, Button, Card, Slider, Typography } from '@mui/material';
import React from 'react';

interface ReaderCardProps {
  reader: any;
  isreade: {
    read: boolean;
    pause: boolean;
  };
  maxParagraf: number;
  handleReadeCancel: () => void;
  handleChangeParagraf: (event: Event, value: any) => void;
  handleReade: () => void;
}

const ReaderCard = ({
  reader,
  isreade,
  maxParagraf,
  handleReadeCancel,
  handleChangeParagraf,
  handleReade,
}: ReaderCardProps) => {
  if (!reader || !isreade.read) {
    return <></>;
  }

  return (
    <Card sx={{ p: 1 }}>
      <Box>
        <Button onClick={handleReade}>
          <Typography>
            {!isreade.read ? 'Старт' : isreade.pause ? 'Продовжити' : 'Пауза'}
          </Typography>
        </Button>
        <Button onClick={handleReadeCancel}>
          <Typography>Стоп</Typography>
        </Button>
        <Typography>Параграф</Typography>
        <Slider
          name="paragraf"
          onChange={handleChangeParagraf}
          min={0}
          step={1}
          max={maxParagraf}
          value={reader?.paragraf}
          valueLabelDisplay="auto"
        />
      </Box>
    </Card>
  );
};

export default ReaderCard;
