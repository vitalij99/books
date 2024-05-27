import { Box, Button, Card, Slider, Typography } from '@mui/material';
import React from 'react';

import Image from 'next/image';

interface ReaderCardProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
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
  toggleDrawer,
  reader,
  isreade,
  maxParagraf,
  handleReadeCancel,
  handleChangeParagraf,
  handleReade,
}: ReaderCardProps) => {
  return (
    <Card sx={{ padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={toggleDrawer(true)}>
          <Image
            src="/reader.svg"
            width={40}
            height={40}
            alt="синтез мовлення"
          />
        </Button>
      </Box>

      {reader && isreade.read && (
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
      )}
    </Card>
  );
};

export default ReaderCard;
