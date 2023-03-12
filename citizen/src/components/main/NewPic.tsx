import { Box, Button, Fab, Stack, Typography } from '@pankod/refine-mui';
import React from 'react';
import { ReactComponent as BlueBin } from '../../assets/icons/blue_bin.svg';
import CheckIcon from '@mui/icons-material/Check';
import CachedIcon from '@mui/icons-material/Cached';

interface NewPicProps {
  imageUrl: string;
}
export const NewPic: React.FC<NewPicProps> = ({ imageUrl }) => {
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
        spacing={4}
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
                SRB #2702A001
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
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          px={3}
          pb={2}
        >
          <Box
            component="div"
            sx={{
              width: '100%',
              borderRadius: '28px',
              height: '285px',
              border: 2,
              borderColor: 'common.main',
              overflow: 'hidden',
            }}
          >
            {imageUrl && (
              <div>
                <img src={imageUrl} alt="Screenshot" />
              </div>
            )}
            <Box>
              <Fab
                size="medium"
                color="success"
                aria-label="next"
                sx={{
                  width: 60,
                  height: 60,
                  position: 'absolute',
                  bottom: 30,
                  right: '10%',
                  transform: 'translateX(50%)',
                  '&:hover': {
                    backgroundColor: 'common.main',
                  },
                }}
                onClick={() => {}}
              >
                <CachedIcon fontSize="large" fontWeight="bold" />
              </Fab>
            </Box>
          </Box>
        </Stack>
        {/* The Card CTA */}{' '}
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
            // onClick={handleNext}
          >
            <CheckIcon fontSize="large" fontWeight="bold" />
          </Fab>
        </Box>
      </Stack>
    </Box>
  );
};
