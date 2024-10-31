'use client';

import { EndTimerProps } from '@/types/endTimer';
import { Box, Typography } from '@mui/material';
import React from 'react';

const EndTimer = ({ isreade, paramsReader }: EndTimerProps) => {
  if (!paramsReader.timer.checked) {
    return <></>;
  }
  return (
    <Typography textAlign={'center'}>
      Кінцевий час:
      <Box component="span" color={'green'}>
        {isreade.read && paramsReader?.timer?.timeSave
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
