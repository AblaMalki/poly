import { LightTheme, typography } from '@pankod/refine-mui';
import '@fontsource/inter';

export const customTheme = {
  ...LightTheme,
  ...typography,
  palette: {
    ...LightTheme.palette,
    primary: {
      // blue
      main: '#1976D2',
      light: '#19B9E2',
      select: ' #B9E1FF',
      contrastText: '#fff',
    },
    secondary: {
      // red
      main: '#FF2828',
      light: '#F8D7D7',
      orange: '#FF9A02',
      contrastText: '#fff',
    },
    background: {
      default: '#F1F1F1',
      paper: '#ffffff',
    },
    common: {
      // grey
      main: '#9E9E9E',
      dark: '#B6B6B6',
      light: '#DADADA',
    },
    success: {
      // green
      main: '#00B960',
      contrastText: '#fff',
    },
    error: {
      main: '#FF2828',
      contrastText: '#fff',
    },
    warning: {
      main: '#fa8c16',
      contrastText: '#fff',
    },
    info: {
      main: '#0b82f0',
      contrastText: '#fff',
    },
    divider: 'rgba(0,0,0,0)',
    text: {
      primary: '#626262',
      secondary: '#9f9f9f',
      disabled: '#c1c1c1',
    },
    white: '#fff',
  },
  typography: {
    fontFamily: 'Inter',
    h2: {
      fontFamily: 'Inter',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 'medium',
    },
    h4: {
      fontFamily: 'Inter',
      fontSize: '15px',
    },

    body1: {
      fontFamily: 'Inter',
      fontSize: '11px',
    },
    body2: {
      fontFamily: 'Inter',
      fontSize: '10px',
    },
  },
};

// h1: {
//     fontSize: '24px',
//     fontWeight: 'medium',
//     textTransform: 'uppercase',
//   },
//   h2: {
//     fontSize: '16px',
//     fontWeight: 'medium',
//   },
//   h3: {
//     fontSize: '14px',
//   },
//   body1: {
//     fontSize: '12px',
//   },
//   button: {
//     fontSize: '11px',
//   },
//   body2: {
//     fontSize: '10px',
//   },
