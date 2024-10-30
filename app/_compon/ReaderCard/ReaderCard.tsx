import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import SliderParagraf from '@/app/_compon/SliderParagraf/SliderParagraf';

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

        <SliderParagraf
          reader={reader}
          handleChangeParagraf={handleChangeParagraf}
          maxParagraf={maxParagraf}
        />
      </Box>
    </Card>
  );
};

export default ReaderCard;
