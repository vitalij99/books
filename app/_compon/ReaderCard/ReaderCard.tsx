import { Box, Button, Card, Slider, SvgIcon, Typography } from '@mui/material';
import React from 'react';

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

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
      <Box
        sx={{
          display: 'flex',
          borderRadius: '10px',
          justifyContent: 'flex-end',
        }}
      >
        <Button sx={{ p: 1 }} onClick={toggleDrawer(true)}>
          <PlayCircleFilledWhiteOutlinedIcon sx={{ width: 45, height: 45 }} />
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
