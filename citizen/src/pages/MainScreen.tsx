import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
  StepIconProps,
  styled,
  StepConnector,
  stepConnectorClasses,
  SaveButton,
  Fab,
  Input,
  CircularProgress,
} from '@pankod/refine-mui';
import {
  TaskOutlined,
  CameraAltOutlined,
  QrCodeOutlined,
} from '@mui/icons-material';

import background_mobile from '../assets/background_mobile.svg';
import logo_polyrec from '../assets/logo_polyrec.svg';
import CachedIcon from '@mui/icons-material/Cached';
import { IStep } from 'interfaces/common';
import { ReactComponent as Water } from '../assets/icons/water.svg';
import { ReactComponent as QR } from '../assets/icons/qr.svg';
import {
  IResourceComponentsProps,
  useTranslate,
  useApiUrl,
  HttpError,
  useShow,
  useList,
  useCustom,
  useCustomMutation,
} from '@pankod/refine-core';
import {
  useStepsForm,
  Controller,
  FieldValues,
} from '@pankod/refine-react-hook-form';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { ReactComponent as BlueBin } from '../assets/icons/blue_bin.svg';
import { ReactComponent as BinFull } from '../assets/BIN_full.svg';
import background_mobile_scan from '../assets/background_mobile_scan.svg';
import CheckIcon from '@mui/icons-material/Check';

import { Slider } from '@pankod/refine-mui';
import Webcam from 'react-webcam';
interface IRequest {
  image?: string;
  binId?: number;
  percentage?: number;
}
interface IState {
  delay: number;
  result: string;
}

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

interface IBin {
  createdAt?: string;
  id?: number;
  codeSrb?: string;
  nom_pdc?: string;
  // superviseur?: IUser;
  date_creation?: string;
  date_deploiement?: string;
  etat?: 'Actif' | 'Pending';
  // adress?: IAddress;
  latitude?: string;
  longitude?: string;
  type_pdc?: IType;
  secteur?: ISector;
  ville?: string;
  zone?: string;
  fillLevel?: number;
}
export interface ISector {
  id: number;
  secteur: string;
  createdAt?: string;
  updatedAt?: string;
  ville: string;
}

export interface IType {
  id: number;
  type: string;
}
export const MainScreen: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { onFinish, formLoading },
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IRequest, HttpError, IRequest>({
    stepsProps: {
      isBackValidate: false,
    },
    warnWhenUnsavedChanges: true,
  });
  const [state, setState] = useState<IState>({
    delay: 100,
    result: '1303F0002',
  });
  const handleScan = (dat: string | null) => {
    if (dat) {
      setState({ ...state, result: dat });
      gotoStep(1);
    }
  };
  const handleError = (err: Error) => {
    console.error(err);
  };

  // const { queryResult } = useShow<IBin>({
  //   resource: `bins/bin/${state.result}`,
  // });
  // const { data, isLoading, isError } = queryResult;
  // const { data, isLoading, isError } = useList<IBin, HttpError>({
  //   resource: `bins/bin/${state.result}`,
  //   // resource: 'bins',
  // });
  const apiUrl = useApiUrl();
  const { data, isLoading } = useCustom<IBin>({
    url: `${apiUrl}/bins/bin/${state.result}`,
    method: 'get',
  });
  const binDetails = data?.data;
  console.log(binDetails);
  const { mutate } = useCustomMutation<IRequest>();

  // const handleScan = (data: string | null) => {
  //   if (data) {
  //     setState({ ...state, result: data });
  //     gotoStep(1);
  //   }
  // };

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
  const [values, setValues] = React.useState<number>(30);

  const getColor = (val: number) => {
    if (val <= 50) {
      return 'primary.main';
    } else if (val <= 70) {
      return 'secondary.orange';
    } else {
      return 'secondary.main';
    }
  };

  const constraints = {
    // width: 720,
    // height: 330,
    facingMode: { exact: 'environment' },
  };
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = React.useState('');

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setUrl(imageSrc as string);
    gotoStep(3);
  }, [webcamRef]);
  const onUserMedia = (e: any) => {
    console.log(e);
  };
  useEffect(() => {
    setValue('percentage', values);
    setValue('image', url);
  }, [values, setValue, url]);

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => setUrl(result));
  };
  const steps = ['Scan', 'Fill Level', 'Pic', 'New Pic'];
  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box
            component="div"
            sx={{
              width: '100%',
              height: '100%',
              p: '16px',
            }}
          >
            <Stack
              justifyContent="space-between"
              spacing={3}
              alignItems="center"
              mt={3}
            >
              <Box
                component="div"
                borderBottom={7}
                borderTop={7}
                borderColor="primary.main"
                borderRadius={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: 280,
                  height: 220,
                  overflow: 'hidden',
                  zIndex: '200',
                }}
              >
                <QrScanner
                  scanDelay={state.delay}
                  onError={handleError}
                  onDecode={handleScan}
                  constraints={constraints}
                  // videoStyle={{
                  //   width: '100%',
                  //   height: '100%',
                  // }}
                  // containerStyle={{
                  //   width: '100%',
                  //   height: '100%',
                  // }}
                />
              </Box>

              <p>{state.result}</p>
              <QR width={43} height={43} />
              <Typography>
                Scan le{' '}
                <span>
                  QR Code <br /> sur la Bouteille
                </span>
              </Typography>
            </Stack>
          </Box>
        );
      case 1:
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
                      SRB #{state.result}
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
                    {...register('percentage')}
                    name="percentage"
                    sx={{ height: 230, width: 8, color: getColor(values) }}
                    aria-label="FillLevel"
                    value={watch('percentage')}
                    onChange={(event: Event, newValue: number | number[]) => {
                      setValues(newValue as number);
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
                  onClick={() => {
                    gotoStep(2);
                  }}
                >
                  <CheckIcon fontSize="large" fontWeight="bold" />
                </Fab>
              </Box>
            </Stack>
          </Box>
        );
      case 2:
        return (
          <Box
            component="div"
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              boxShadow: '5',
              borderRadius: '32px',
              height: '100%',
              p: '16px',
            }}
          >
            <Stack
              justifyContent="space-between"
              spacing={2}
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
                      SRB #{state.result}
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
                spacing={3}
              >
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
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
                  {/* {url && (
                    <div>
                      <img src={url} alt="Screenshot" />
                    </div>
                  )} */}
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
      case 3:
        return (
          <Box
            component="div"
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              boxShadow: '5',
              borderRadius: '32px',
              height: '100%',
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
                      SRB #{state.result}
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
                    width: '245px',
                    borderRadius: '28px',
                    height: '285px',
                    border: 2,
                    borderColor: 'common.main',
                    overflow: 'hidden',
                  }}
                >
                  <Input
                    id="image-input"
                    type="file"
                    sx={{
                      display: 'none',
                    }}
                  />
                  <input
                    type="file"
                    id="file"
                    {...register('image')}
                    name="image"
                    // value={watch('image')}
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleImageChange(e.target.files![0]);
                    }}
                  />
                  {url && (
                    <>
                      <img src={url} alt="Screenshot" />
                    </>
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
                      onClick={() => gotoStep(2)}
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
                  onClick={handleSubmit(onFinishHandler)}
                >
                  <CheckIcon fontSize="large" fontWeight="bold" />
                </Fab>
              </Box>
            </Stack>
          </Box>
        );
    }
  };
  console.log(typeof binDetails);
  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
      binId: binDetails?.id,
      image: url,
      percentage: values,
    });
  };
  // mutate({
  //   url: `${apiUrl}/requests`,
  //   method: 'post',
  //   values: {
  //     ...data,
  //     binId: binDetails?.id,
  //     image: url,
  //     percentage: values,
  //   },
  // });
  const [currentView, setCurrentView] = useState('SpalshScreen');

  const switchView = (view: string) => {
    setCurrentView(view);
  };
  // SplashScreen
  const [progress, setProgress] = React.useState(0);

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
  //////////////////////////////////////
  const renderView = () => {
    switch (currentView) {
      case 'SpalshScreen':
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
                    // variant="determinate"
                    value={progress}
                    color="primary"
                    size={60}
                  />
                </div>
              </Stack>
            </Container>
          </Box>
        );
      case 'MainScreen':
        return (
          <div>
            <h1>Screen 2</h1>
            <button onClick={() => switchView('screen1')}>
              Go to Screen 1
            </button>
          </div>
        );
      default:
        return (
          <div>
            <h1>Default Screen</h1>
            <button onClick={() => switchView('screen1')}>
              Go to Screen 1
            </button>
          </div>
        );
    }
  };
  return (
    // <Box
    //   component="div"
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignContent: 'center',
    //     backgroundImage: `url(${background_mobile_scan})`,
    //     backgroundSize: 'cover',
    //   }}
    // >
    //   <Stepper
    //     alternativeLabel
    //     activeStep={currentStep}
    //     connector={<ColorlibConnector />}
    //     sx={{
    //       backgroundColor: '#fff',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       borderRadius: '10px',
    //       boxShadow: '5',
    //     }}
    //     // style={{ display: 'flex', flexDirection: 'column' }}
    //   >
    //     {steps.map((label, index) => {
    //       const stepProps: { completed?: boolean } = {};
    //       const labelProps: {
    //         optional?: React.ReactNode;
    //       } = {};

    //       return (
    //         <Step {...stepProps} key={label}>
    //           <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>
    //             {/* {label} */}
    //           </StepLabel>
    //           {/* <StepButton onClick={() => gotoStep(index)}>{label}</StepButton> */}
    //         </Step>
    //       );
    //     })}
    //   </Stepper>

    //   <Box
    //     component="main"
    //     sx={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       // justifyContent: 'center',
    //       alignItems: 'center',
    //       height: '100%',
    //       mt: '12px',
    //     }}
    //   >
    //     {renderFormByStep(currentStep)}
    //   </Box>
    //   <>
    //     {currentStep < steps.length - 1 && (
    //       <Button
    //         onClick={() => {
    //           gotoStep(currentStep + 1);
    //         }}
    //       >
    //         next
    //       </Button>
    //     )}
    //     {currentStep > 0 && (
    //       <Button
    //         onClick={() => {
    //           gotoStep(currentStep - 1);
    //         }}
    //       >
    //         prev
    //       </Button>
    //     )}
    //     {currentStep === steps.length - 1 && (
    //       <SaveButton onClick={handleSubmit(onFinishHandler)} />
    //     )}
    //   </>
    // </Box>
    <div style={{ height: '100vh' }}>{renderView()}</div>
  );
};
