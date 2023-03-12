import { Box, Button, Stack, Typography } from '@pankod/refine-mui';
import React, { useRef, useState, useEffect } from 'react';
import { ReactComponent as BlueBin } from '../../assets/icons/blue_bin.svg';
import { ReactComponent as ScanBin } from '../../assets/icons/scan_bin.svg';
import { CameraAltOutlined } from '@mui/icons-material';
import Webcam from 'react-webcam';

interface PicProps {
  handleImageUrl: (url: string) => void;
}
export const Pic: React.FC<PicProps> = ({ handleImageUrl }) => {
  const constraints = {
    width: 720,
    height: 330,
    facingMode: { exact: 'environment' },
  };
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = React.useState('');
  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setUrl(imageSrc as string);
    handleImageUrl(url);
  }, [webcamRef]);
  const onUserMedia = (e: any) => {
    console.log(e);
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
          component="div"
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={6}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Box
              component="div"
              sx={{
                width: '245px',
                borderRadius: '28px',
                height: '285px',
                border: 2,
                borderColor: 'common.main',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <ScanBin /> */}
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={constraints}
                onUserMedia={onUserMedia}
                width={720}
                height={400}
              />
            </Box>
            {url && (
              <div>
                <img src={url} alt="Screenshot" />
              </div>
            )}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: 'common.main' }}
            >
              soyez sûre que la photo montre <br /> le niveau de la SRB{' '}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<CameraAltOutlined />}
            onClick={capturePhoto}
            sx={{
              width: '196px',
              height: '40px',
              textTransform: 'uppercase',
            }}
          >
            <Typography>prendre une photo</Typography>
          </Button>
        </Stack>
        {/* The Card CTA */} <Box></Box>
      </Stack>
    </Box>
  );
};
