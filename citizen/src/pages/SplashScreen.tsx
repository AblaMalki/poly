import { Box, CircularProgress, Container, Stack } from '@pankod/refine-mui';
import React from 'react';
import background_mobile from '../assets/background_mobile.svg';
import logo_polyrec from '../assets/logo_polyrec.svg';
import { useNavigate } from '@pankod/refine-react-router-v6';

export const SplashScreen: React.FC = () => {
  const [progress, setProgress] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 25
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      component="div"
      sx={{
        backgroundImage: `url(${background_mobile})`,
        backgroundSize: 'cover',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Stack
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 6,
          }}
        >
          <img src={logo_polyrec} alt="Polyrec Logo" />
          <div>
            <CircularProgress
              variant="determinate"
              value={progress}
              color="primary"
              size={60}
            />
          </div>
        </Stack>
      </Container>
    </Box>
  );
};
