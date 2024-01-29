import { getStorage } from '@/lib/getStorage';
import { READER_KEY } from '@/type/book';
import {
  Box,
  Button,
  Drawer,
  MenuItem,
  Select,
  SelectChangeEvent,
  SvgIcon,
  debounce,
} from '@mui/material';

import { useEffect, useState } from 'react';

const Reader = () => {
  const [onOpen, setOnOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>();
  const [voice, setVoice] = useState('');

  useEffect(() => {
    if (onOpen) {
      setVoices(window.speechSynthesis.getVoices());
    }
  }, [onOpen]);

  useEffect(() => {
    if (!voices) return;
    const storage = getStorage(READER_KEY.voice);
    if (!storage) return;
    voices.forEach((elem, index) => {
      if (elem.name === storage) {
        setVoice(voices[index].name);
      }
    });
  }, [voices]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value || '';
    setVoice(value as string);
    handleChangeLocalStorage(value, READER_KEY.voice);
  };

  const handleChangeLocalStorage = debounce((value: string, key: string) => {
    localStorage.setItem(key, value);
  }, 500);
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
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <ReaderIcon />
      </Button>
      {voices && (
        <Drawer anchor="top" open={onOpen} onClose={toggleDrawer(false)}>
          {
            <Box
              sx={{
                p: '10px',
                bgcolor: 'var(--bg-color-menu)',
                flex: 1,
              }}
            >
              asdasd
              <Select
                id="demo-simple-select"
                value={voice}
                label="voice"
                onChange={handleChange}
              >
                {voices &&
                  voices.map((elem, index) => {
                    return (
                      <MenuItem key={index} value={elem.name}>
                        {elem.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Box>
          }
        </Drawer>
      )}
    </div>
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
        stroke="#fff"
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
