import { Box, Checkbox, OutlinedInput, Typography } from '@mui/material';

import { ChangeEvent } from 'react';
import { InitParamsReader } from '@/types/reader';
import EndTimer from '@/app/_compon/EndTimer/EndTimer';

interface TimerProps {
  paramsReader: InitParamsReader;
  handleChangeCheckbox: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  isreade: {
    read: boolean;
    pause: boolean;
  };
  handleParamsTimer: (event: any, value: number | number[]) => void;
}

const Timer = ({
  paramsReader,
  handleChangeCheckbox,
  isreade,
  handleParamsTimer,
}: TimerProps) => {
  return (
    <>
      <Typography>Таймер в хв.</Typography>
      <Box sx={{ display: 'flex' }}>
        <Checkbox
          checked={paramsReader.timer.checked}
          onChange={handleChangeCheckbox}
          inputProps={{ 'aria-label': 'таймер' }}
        />
        <OutlinedInput
          name="timer"
          label="Таймер"
          type="number"
          value={paramsReader?.timer.timer}
          disabled={!paramsReader.timer.checked || isreade.read}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const res = Number(event.target.value);
            handleParamsTimer(event, res);
          }}
        />
      </Box>
      <EndTimer isreade={isreade} paramsReader={paramsReader} />
    </>
  );
};

export default Timer;
