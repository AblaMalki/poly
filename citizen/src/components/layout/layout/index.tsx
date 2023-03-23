import React from 'react';
import { LayoutProps } from '@pankod/refine-core';
import { Box } from '@pankod/refine-mui';

import { Header as DefaultHeader } from '../header';

export const Layout: React.FC<LayoutProps> = ({
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <Box display="flex" flexDirection="row">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: '100vh',
        }}
      >
        {/* <HeaderToRender /> */}
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
