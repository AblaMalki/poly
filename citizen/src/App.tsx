import React from 'react';

import { Refine, AuthProvider } from '@pankod/refine-core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-mui';
import { customTheme } from './theme';

import dataProvider from '@pankod/refine-simple-rest';
import { MuiInferencer } from '@pankod/refine-inferencer/mui';
import routerProvider from '@pankod/refine-react-router-v6';
import axios, { AxiosRequestConfig } from 'axios';
import { useTranslation } from 'react-i18next';
import { Title, Layout, Header } from 'components/layout';
import { Login } from 'pages/login';
import { CredentialResponse } from 'interfaces/google';
import { parseJwt } from 'utils/parse-jwt';
import { SplashScreen } from 'pages/SplashScreen';
import { MainScreen } from 'pages/MainScreen';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const { t, i18n } = useTranslation();

  const authProvider: AuthProvider = {
    login: ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );
      }

      localStorage.setItem('token', `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem('token');

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem('token');

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <Refine
          // dataProvider={dataProvider('https://polyrec.kbdev.co')}
          dataProvider={dataProvider('http://localhost:3001')}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            // {
            //   name: 'bins',
            //   list: MainScreen,
            //   // edit: MuiInferencer,
            //   // show: MuiInferencer,
            //   // create: MuiInferencer,
            //   // canDelete: true,
            // },
            {
              name: 'requests',
              list: MainScreen,
              create: MainScreen,
            },
            // {
            //   name: 'posts',
            //   list: MuiInferencer,
            //   edit: MuiInferencer,
            //   show: MuiInferencer,
            //   create: MuiInferencer,
            //   canDelete: true,
            // },
          ]}
          Title={Title}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          // authProvider={authProvider}
          // LoginPage={Login}
          LoginPage={SplashScreen}
          // DashboardPage={MainScreen}
          i18nProvider={i18nProvider}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
