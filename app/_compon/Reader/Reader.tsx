'use client';
import { getStorage } from '@/lib/getStorage';
import { StartReader } from '@/lib/reader';
import { READER_KEY } from '@/type/book';

import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  SvgIcon,
  Typography,
} from '@mui/material';
import debounce from 'lodash.debounce';

import { useEffect, useState } from 'react';
import DarkProvider from '../DarkProvider/DarkProvider';

interface StartReaderProps {
  book: string[];
  changeText: (number: number) => void;
}

const initParamsReader = {
  pitch: 2,
  rate: 2,
  language: '',
  volume: 1,
};

const Reader = ({ book, changeText }: StartReaderProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const [isreade, setIsreade] = useState({ read: false, pause: false });
  const [paramsReader, setParamsReader] = useState(initParamsReader);

  const reader = StartReader({ book, changeText });

  useEffect(() => {
    const storage = {
      pitch: Number(getStorage(READER_KEY.pitch)) || 2,
      rate: Number(getStorage(READER_KEY.rate)) || 2,
      language: getStorage(READER_KEY.voice) || '',
      volume: Number(getStorage(READER_KEY.volume)) || 1,
    };
    setParamsReader(storage);
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
      reader.speak();
      setIsreade({ ...isreade, read: true });
    } else if (isreade.pause) {
      reader.synth.resume();
      setIsreade({ ...isreade, pause: false });
    } else {
      reader.synth.pause();
      setIsreade({ ...isreade, pause: true });
    }
  };

  const handleReadeCancel = () => {
    if (!reader) return;
    reader.synth.cancel();
    changeText(-1);
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

  return (
    <DarkProvider>
      <Button onClick={toggleDrawer(true)}>
        <ReaderIcon />
      </Button>
      {reader && (
        <Drawer anchor="top" open={onOpen} onClose={toggleDrawer(false)}>
          {
            <Box
              sx={{
                p: '10px',
                bgcolor: 'var(--bg-color-menu)',
                flex: 1,
                display: 'flex',
                gap: 5,
              }}
            >
              <Button onClick={handleReade}>
                <Typography color={'var(--text-book)'}>
                  {!isreade.read
                    ? 'Старт'
                    : isreade.pause
                    ? 'Продовжити'
                    : 'Пауза'}
                </Typography>
              </Button>

              {isreade.read && (
                <Button onClick={handleReadeCancel}>
                  <Typography color={'var(--text-book)'}>Стоп</Typography>
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
              </Box>
            </Box>
          }
        </Drawer>
      )}
    </DarkProvider>
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
