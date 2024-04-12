'use client';

import { EndTimerProps } from '@/types/book';
import { Box, Typography, styled } from '@mui/material';

const EndTimer = ({ isreade, paramsReader }: EndTimerProps) => {
  if (!paramsReader.timer.checked) {
    return <></>;
  }
  return (
    <Typography textAlign={'center'}>
      Кінцевий час:
      <Box component="span" color={'red'}>
        {isreade.read
          ? new Date(paramsReader.timer.timeSave).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : new Date(
              new Date().getTime() + paramsReader.timer.timer * 60000
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
      </Box>
    </Typography>
  );
};

export default EndTimer;
