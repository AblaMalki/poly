import React from 'react';
import { ReactComponent as BlueBin } from '../../assets/icons/blue_bin.svg';
import { ReactComponent as BinFull } from '../../assets/BIN_full.svg';
import 'style.css';
import { Box, Fab, Slider, Stack, Typography } from '@pankod/refine-mui';
import CheckIcon from '@mui/icons-material/Check';

function valuetext(value: number) {
  return `${value}%`;
}

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
  },
  {
    value: 60,
  },
  {
    value: 70,
  },
  {
    value: 80,
  },
  {
    value: 90,
  },
  {
    value: 100,
    label: '100%',
    className: 'slider-mark-100',
  },
];

interface LevelProps {
  scanResult: string;
  handleNext: () => void;
}

export const Level: React.FC<LevelProps> = ({ scanResult, handleNext }) => {
  const [value, setValue] = React.useState<number>(30);

  const getColor = (val: number) => {
    if (val <= 50) {
      return 'primary.main';
    } else if (val <= 70) {
      return 'secondary.orange';
    } else {
      return 'secondary.main';
    }
  };

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '5',
        borderRadius: '32px',
        height: 'auto',
        px: '16px',
        py: '20px',
      }}
    >
      <Stack
        justifyContent="space-between"
        spacing={6}
        sx={{
          position: 'relative',
        }}
      >
        {/* The Card Header */}
        <Box component="div">
          <Stack direction="row" spacing={2} alignItems="center">
            <BlueBin />
            <Stack>
              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                SRB #{scanResult}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2">Vider </Typography>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  Hier à 12:29{' '}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        {/* The Card Content */}
        <Box component="div" px={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <BinFull />
            <Slider
              sx={{ height: 230, width: 8, color: getColor(value) }}
              aria-label="FillLevel"
              value={value}
              onChange={(event: Event, newValue: number | number[]) => {
                setValue(newValue as number);
              }}
              defaultValue={30} //from The DB
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              orientation="vertical"
              step={10}
              marks={marks}
              min={0}
              max={100}
              classes={{
                mark: 'slider-mark', // custom class for the mark container
                markLabel: 'slider-mark-label', // custom class for the mark label
              }}
              // components={{
              //   ValueLabel: (props) => (
              //     <Tooltip {...props} arrow placement="top" />
              //   ),
              // }}
            />
          </Stack>
        </Box>
        {/* The Card CTA */}
        <Box>
          <Fab
            size="large"
            color="primary"
            aria-label="next"
            sx={{
              width: 70,
              height: 70,
              position: 'absolute',
              bottom: -40,
              right: '50%',
              transform: 'translateX(50%)',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
            }}
            onClick={handleNext}
          >
            <CheckIcon fontSize="large" fontWeight="bold" />
          </Fab>
        </Box>
      </Stack>
    </Box>
  );
};

// To Fix The Tooltip for the slider
