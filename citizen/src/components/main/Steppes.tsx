import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@pankod/refine-mui';
import { styled } from '@mui/material/styles';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import {
  TaskOutlined,
  CameraAltOutlined,
  QrCodeOutlined,
} from '@mui/icons-material';
import { IStep } from 'interfaces/common';
import { ReactComponent as Water } from '../../assets/icons/water.svg';
import { Pic } from './Pic';
import { Level } from './Level';
import { Scan } from './Scan';
import { NewPic } from './NewPic';

export const Steppes = ({ activeStep }: IStep) => {
  const [scanResult, setScanResult] = useState<string>('');

  const handleScan = (result: string) => {
    setScanResult(result);
  };
  // the Connetor
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 32,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#1976D2',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#1976D2',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    zIndex: 1,
    color: '#9E9E9E',
    width: 70,
    height: 70,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#1976D2',
      // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      color: '#1976D2',
    }),
  }));
  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <QrCodeOutlined />,
      2: <Water />,
      3: <CameraAltOutlined />,
      4: <TaskOutlined />,
    };
    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  const steps = ['Scan', 'Fill Level', 'Pic', 'New Pic'];
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
      sx={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow: '5',
      }}
      // style={{ display: 'flex', flexDirection: 'column' }}
    >
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};

        return (
          <Step {...stepProps}>
            <StepLabel
              {...labelProps}
              StepIconComponent={ColorlibStepIcon}
            ></StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
