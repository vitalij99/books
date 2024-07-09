'use client';
import { getStorage, setStorage } from '@/lib/getStorage';
import { useStartReader } from '@/lib/reader';

import {
  Box,
  Button,
  Checkbox,
  Drawer,
  SelectChangeEvent,
  Slider,
  Typography,
} from '@mui/material';

import debounce from 'lodash.debounce';

import { ChangeEvent, useEffect, useState } from 'react';

import { READER_KEY, StartReaderProps, initParamsReader } from '@/types/reader';
import ReaderCard from '@/app/_compon/ReaderCard/ReaderCard';
import SelectReaderVoice from '@/app/_compon/SelectReaderVoice/SelectReaderVoice';
import SliderParagraf from '@/app/_compon/SliderParagraf/SliderParagraf';
import Timer from '@/app/_compon/Timer/Timer';

const Reader = ({
  book,
  changeText,
  srcNextPage,
  autoScroll,
}: StartReaderProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const [isreade, setIsreade] = useState({ read: false, pause: false });
  const [paramsReader, setParamsReader] = useState(initParamsReader);

  const reader = useStartReader({
    book,
    changeText,
    srcNextPage,
    isreade,
  });

  useEffect(() => {
    const storage = {
      pitch: Number(getStorage(READER_KEY.pitch)) || 1,
      rate: Number(getStorage(READER_KEY.rate)) || 2,
      language: getStorage(READER_KEY.voice) || '',
      volume: Number(getStorage(READER_KEY.volume)) || 1,
    };

    setParamsReader(prev => ({ ...prev, ...storage }));
  }, []);

  useEffect(() => {
    const storageTimer = getStorage(READER_KEY.timer);
    const timer: {
      timeSave: Date;
      timer: number;
      checked: boolean;
    } =
      storageTimer.length === 0
        ? initParamsReader.timer
        : JSON.parse(storageTimer);

    const dateSave = new Date(timer.timeSave);
    const dateNow = new Date();

    setParamsReader(prev => ({ ...prev, timer }));
    if (dateSave >= dateNow && timer.checked) {
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
      reader.speak(reader.paragraf === -1 ? 0 : reader.paragraf);
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
      timeSave.setMinutes(timeSave.getMinutes() + prev.timer.timer);

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
      <ReaderCard
        toggleDrawer={toggleDrawer}
        reader={reader}
        isreade={isreade}
        handleReadeCancel={handleReadeCancel}
        handleChangeParagraf={handleChangeParagraf}
        handleReade={handleReade}
        maxParagraf={book.length}
      />
      <Drawer anchor="right" open={onOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            p: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            overflowX: 'hidden',
          }}
        >
          <Button onClick={handleReade}>
            <Typography>
              {!isreade.read ? 'Старт' : isreade.pause ? 'Продовжити' : 'Пауза'}
            </Typography>
          </Button>

          {isreade.read && (
            <Button onClick={handleReadeCancel}>
              <Typography>Стоп</Typography>
            </Button>
          )}
          <SelectReaderVoice
            reader={reader}
            paramsReader={paramsReader}
            handleChangeSelect={handleChangeSelect}
          />

          <Box width={250}>
            <Typography>Швидкість</Typography>
            <Slider
              name="rate"
              onChange={handleSliderParams}
              min={0}
              max={2}
              step={0.1}
              value={paramsReader?.rate}
              valueLabelDisplay="auto"
            />

            <Typography>Тон</Typography>
            <Slider
              name="pitch"
              onChange={handleSliderParams}
              min={0}
              max={2}
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
            <SliderParagraf
              reader={reader}
              handleChangeParagraf={handleChangeParagraf}
              maxParagraf={book.length}
            />
            <Timer
              paramsReader={paramsReader}
              handleChangeCheckbox={handleChangeCheckbox}
              isreade={isreade}
              handleParamsTimer={handleParamsTimer}
            />
            <Typography>Ауто скрол за текстом</Typography>
            <Checkbox
              checked={autoScroll.isAutoScroll}
              onChange={autoScroll.handleAutoScroll}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Reader;
