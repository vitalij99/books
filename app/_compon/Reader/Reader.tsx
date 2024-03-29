'use client';
import { getStorage, setStorage } from '@/lib/getStorage';
import { StartReader } from '@/lib/reader';
import { READER_KEY, initParamsReader } from '@/type/book';

import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slider,
  SvgIcon,
  Typography,
} from '@mui/material';

import debounce from 'lodash.debounce';

import { ChangeEvent, useEffect, useState } from 'react';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
  srcNextPage?: string;
}

// add to timer
const Reader = ({ book, changeText, srcNextPage }: StartReaderProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const [isreade, setIsreade] = useState({ read: false, pause: false });
  const [paramsReader, setParamsReader] = useState(initParamsReader);

  const reader = StartReader({
    book,
    changeText,
    srcNextPage,
    isreade,
  });

  useEffect(() => {
    const storage = {
      pitch: Number(getStorage(READER_KEY.pitch)) || 2,
      rate: Number(getStorage(READER_KEY.rate)) || 2,
      language: getStorage(READER_KEY.voice) || '',
      volume: Number(getStorage(READER_KEY.volume)) || 1,
    };

    setParamsReader(prev => ({ ...prev, ...storage }));
  }, []);

  useEffect(() => {
    const timerStr = getStorage(READER_KEY.timer);
    if (!timerStr) return;
    const timer: {
      timeSave: Date;
      timer: number;
      checked: boolean;
    } = JSON.parse(timerStr);
    if (!timer) return;

    const date1 = new Date(timer.timeSave);
    const date2 = new Date();

    setParamsReader(prev => ({ ...prev, timer }));

    if (date1 >= date2) {
      setIsreade(prev => ({ ...prev, read: true }));
    }
  }, []);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const value = event.target.value || '';

    reader?.handleChangeVoice(value);
    setParamsReader(prev => ({ ...prev, language: value }));
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOnOpen(open);
    };

  const handleReade = () => {
    if (!reader) return;

    if (!reader.synth.speaking) {
      reader.speak(reader.paragraf);
      setIsreade({ ...isreade, read: true });
    } else if (isreade.pause) {
      reader.synth.resume();
      setIsreade({ ...isreade, pause: false });
    } else {
      reader.synth.pause();
      setIsreade({ ...isreade, pause: true });
    }

    setParamsReader(prev => {
      const timeSave = new Date();
      timeSave.setMinutes(prev.timer.timer);

      const newTimer = { ...prev.timer, timeSave };

      setStorage(newTimer, READER_KEY.timer);

      return { ...prev, timer: newTimer };
    });
  };

  const handleReadeCancel = () => {
    if (!reader) return;
    reader.handleCancel();

    setIsreade({ read: false, pause: false });
  };

  const handleSliderParams = (event: Event, value: number | number[]) => {
    if (!event || !event.target) {
      return;
    }
    const element = event.target as HTMLInputElement;
    const key: string = element.name;

    if (key) {
      setParamsReader(prev => ({ ...prev, [key]: value }));
    }

    debounce(() => {
      reader?.handleChangeParams({ [key]: value });
    }, 1000)();
  };
  const handleParamsTimer = (event: any, value: number | number[]) => {
    if (typeof value === 'number') {
      setParamsReader(prev => {
        const newTimer = { ...prev.timer, timer: value };
        setStorage(newTimer, READER_KEY.timer);
        return { ...prev, timer: newTimer };
      });
    }
  };
  const handleChangeParagraf = (event: Event, value: any) => {
    reader?.handleChangeParagraf(value);
  };

  const handleChangeCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setParamsReader(prev => {
      const newTimer = { ...prev.timer, checked };
      setStorage(newTimer, READER_KEY.timer);
      return { ...prev, timer: newTimer };
    });
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <ReaderIcon />
      </Button>
      {reader && (
        <Drawer anchor="right" open={onOpen} onClose={toggleDrawer(false)}>
          {
            <Box
              sx={{
                p: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <Button onClick={handleReade}>
                <Typography>
                  {!isreade.read
                    ? 'Старт'
                    : isreade.pause
                    ? 'Продовжити'
                    : 'Пауза'}
                </Typography>
              </Button>

              {isreade.read && (
                <Button onClick={handleReadeCancel}>
                  <Typography>Стоп</Typography>
                </Button>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  <InputLabel id="select-reader">Голос</InputLabel>
                  <Select
                    id="select-reader"
                    value={paramsReader.language}
                    label="voice"
                    onChange={handleChangeSelect}
                  >
                    {reader.voices?.map((elem, index) => {
                      return (
                        <MenuItem key={index} value={elem.name}>
                          {elem.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box width={250}>
                <Typography>Швидкість</Typography>
                <Slider
                  name="rate"
                  onChange={handleSliderParams}
                  min={0}
                  max={4}
                  step={0.1}
                  value={paramsReader?.rate}
                  valueLabelDisplay="auto"
                />
                <Typography>Тон</Typography>
                <Slider
                  name="pitch"
                  onChange={handleSliderParams}
                  min={0}
                  max={4}
                  value={paramsReader?.pitch}
                  valueLabelDisplay="auto"
                />
                <Typography>Гучність</Typography>
                <Slider
                  name="volume"
                  onChange={handleSliderParams}
                  min={0}
                  step={0.1}
                  max={1}
                  value={paramsReader?.volume}
                  valueLabelDisplay="auto"
                />
                <Typography>Параграф</Typography>
                <Slider
                  name="paragraf"
                  onChange={handleChangeParagraf}
                  min={0}
                  step={1}
                  max={book.length}
                  value={reader.paragraf}
                  valueLabelDisplay="auto"
                />
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
                    disabled={!paramsReader.timer.checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const res = Number(event.target.value);
                      handleParamsTimer(event, res);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          }
        </Drawer>
      )}
    </>
  );
};

export default Reader;
const ReaderIcon = () => {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        strokeWidth={1.5}
        stroke="var(--bg-color-menu)"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M46.0136986,31.1054993L25.1973,20.6973c-0.3096008-0.1532993-0.6777992-0.1387005-0.9727001,0.0438995 C23.9297009,20.9237995,23.75,21.2451,23.75,21.5918007v20.8163986c0,0.3467026,0.1797009,0.6679993,0.4745998,0.8506012 C24.3848,43.3583984,24.5674,43.4081993,24.75,43.4081993c0.1532993,0,0.3057003-0.035099,0.4473-0.1054001l20.8163986-10.4081993 c0.3388023-0.1699982,0.5527-0.5157013,0.5527-0.8945999C46.5663986,31.6210995,46.3525009,31.2754002,46.0136986,31.1054993z M25.75,40.7901001v-17.580101L43.330101,32L25.75,40.7901001z"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M32,0C14.3268995,0,0,14.3268995,0,32s14.3268995,32,32,32s32-14.3269005,32-32S49.6730995,0,32,0z M32,62 C15.4579,62,2,48.542099,2,32C2,15.4580002,15.4579,2,32,2c16.5419998,0,30,13.4580002,30,30C62,48.542099,48.5419998,62,32,62z"
        />
      </svg>
    </SvgIcon>
  );
};
