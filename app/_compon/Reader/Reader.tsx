'use client';
import React from 'react';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Drawer,
  SelectChangeEvent,
  Slider,
  Typography,
} from '@mui/material';
import {
  InitParamsReader,
  PARAMSREADER,
  READER_KEY,
  StartReaderProps,
  initParamsReader,
} from '@/types/reader';
import { getSrorageJSON, setStorage } from '@/lib/getStorage';
import { useStartReader } from '@/lib/useStartReader';
import { ReaderContext } from '@/Providers/ReaderProvider';

import ReaderCard from '@/app/_compon/ReaderCard/ReaderCard';
import SelectReaderVoice from '@/app/_compon/SelectReaderVoice/SelectReaderVoice';
import SliderParagraf from '@/app/_compon/SliderParagraf/SliderParagraf';
import Timer from '@/app/_compon/Timer/Timer';

const Reader = ({
  book,
  changeText,
  autoScroll,
  srcNextPage,
}: StartReaderProps) => {
  const [isreade, setIsreade] = useState({ read: false, pause: false });
  const [paramsReader, setParamsReader] = useState(initParamsReader);
  const { isOpen, handleOpen } = useContext(ReaderContext);

  const reader = useStartReader({
    book,
    changeText,
    isreade,
    paramsReader,
    srcNextPage,
  });

  useEffect(() => {
    const storage: InitParamsReader = getSrorageJSON(PARAMSREADER);

    if (storage) {
      if (storage?.timer?.timeSave) {
        const dateSave = new Date(storage?.timer?.timeSave);
        const dateNow = new Date();
        if (dateSave >= dateNow && storage?.timer?.checked) {
          setIsreade(prev => ({ ...prev, read: true }));
        }
      }

      setParamsReader(prev => ({ ...prev, ...storage }));
    }
  }, []);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const value = event.target.value || '';

    setParamsReader(prev => {
      const updateParams = { ...prev, language: value };
      setStorage(updateParams, PARAMSREADER);
      return updateParams;
    });
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

      handleOpen(open);
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

      const updateParams = { ...prev, timer: newTimer };
      setStorage(updateParams, PARAMSREADER);

      return updateParams;
    });
  };

  const handleReadeCancel = () => {
    if (!reader) return;
    reader.handleCancel();
    setParamsReader(prev => {
      const updateParams = {
        ...prev,
        timer: { ...prev.timer, timeSave: undefined },
      };
      setIsreade({ read: false, pause: false });
      setStorage(updateParams, PARAMSREADER);
      return updateParams;
    });
  };

  const handleSliderParams = (event: Event, value: number | number[]) => {
    if (!event || !event.target) {
      return;
    }
    const element = event.target as HTMLInputElement;
    const key: string = element.name;

    if (key) {
      setParamsReader(prev => {
        const updateParams = { ...prev, [key]: value };
        setStorage(updateParams, PARAMSREADER);
        return updateParams;
      });
    }
  };
  const handleParamsTimer = (event: any, value: number | number[]) => {
    if (typeof value === 'number') {
      setParamsReader(prev => {
        const newTimer = { ...prev.timer, timer: value };
        const updateParams = { ...prev, timer: newTimer };

        setStorage(updateParams, PARAMSREADER);

        return updateParams;
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

      const updateParams = { ...prev, timer: newTimer };

      setStorage(updateParams, PARAMSREADER);

      return updateParams;
    });
  };

  return (
    <Box sx={{ position: 'fixed', right: '0', zIndex: 3 }}>
      <ReaderCard
        reader={reader}
        isreade={isreade}
        handleReadeCancel={handleReadeCancel}
        handleChangeParagraf={handleChangeParagraf}
        handleReade={handleReade}
        maxParagraf={book.length}
      />
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
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
              step={0.1}
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
    </Box>
  );
};

export default Reader;
