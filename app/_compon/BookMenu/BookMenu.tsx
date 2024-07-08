'use client';
import { Box, Button, Drawer } from '@mui/material';
import { useState } from 'react';

import Image from 'next/image';
import MenuStyledText from '@/app/_compon/MenuStyledText/MenuStyledText';

const BookMenu = () => {
  const [anchor, setAnchor] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setAnchor(open);
    };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <Image src="/options.svg" alt="параметри" width={20} height={20} />
      </Button>

      <Drawer anchor="right" open={anchor} onClose={toggleDrawer(false)}>
        {
          <Box
            sx={{
              p: '10px',

              flex: 1,
            }}
          >
            <MenuStyledText />
          </Box>
        }
      </Drawer>
    </div>
  );
};

export default BookMenu;
