import React, { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { ReactComponent as QR } from '../../assets/icons/qr.svg';
import { Level } from './Level';

interface IState {
  delay: number;
  result: string;
}
const constraints = {
  facingMode: { exact: 'environment' },
};

interface ScanProps {
  onScan: (data: string) => void;
}
export const Scan: React.FC<ScanProps> = ({ onScan }) => {
  const [state, setState] = useState<IState>({
    delay: 100,
    result: 'No result',
  });

  const handleScan = (data: string | null) => {
    if (data) {
      setState({ ...state, result: data });
      onScan(data);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        height: 'auto',
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
};

// import { Box, Stack, Typography } from '@pankod/refine-mui';
// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import jsQR from 'jsqr';
// import { ReactComponent as QR } from '../../assets/icons/qr.svg';

// export const Scan: React.FC = () => {
//   const webcamRef = useRef<Webcam>(null);
//   const [qrCode, setQrCode] = useState<string | null>(null);
//   const [scanning, setScanning] = useState(false);
//   const constraints = {
//     facingMode: { exact: 'environment' },
//   };

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       if (
//         scanning &&
//         webcamRef.current &&
//         webcamRef.current.video &&
//         webcamRef.current.video.readyState === 4
//       ) {
//         const canvas = webcamRef.current?.getCanvas();
//         if (!canvas) return;
//         const imageData = canvas
//           .getContext('2d')
//           ?.getImageData(0, 0, canvas.width, canvas.height);
//         if (!imageData) return;
//         const code = jsQR(imageData.data, imageData.width, imageData.height);
//         if (code) {
//           console.log(code.data);
//           setScanning(false);
//           setQrCode(code.data);
//         }
//       }
//     }, 100);
//     return () => clearInterval(interval);
//   }, [scanning]);

//   return (
//     <Box
//       component="div"
//       sx={{
//         width: '100%',
//         height: 'auto',
//         p: '16px',
//       }}
//     >
//       <Stack
//         justifyContent="space-between"
//         spacing={3}
//         alignItems="center"
//         mt={3}
//       >
//         <Box
//           component="div"
//           borderBottom={7}
//           borderTop={7}
//           borderColor="primary.main"
//           borderRadius={6}
//           sx={{
//             backgroundColor: '#fff',
//             width: 200,
//             height: 220,
//           }}
//         >
//           {/* <QrReader
//               delay={300}
//               onError={handleError}
//               onScan={handleScan}
//               style={{ width: '100%' }}
//               videoConstraints={constraints}
//             />{' '} */}
//           <Webcam
//             audio={false}
//             height={220}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width={200}
//             videoConstraints={constraints}
//           />
//           {qrCode ? (
//             <div>
//               <p>QR code detected:</p>
//               <p>{qrCode}</p>
//             </div>
//           ) : (
//             <p>Scanning...</p>
//           )}
//         </Box>

//         <QR width={43} height={43} />
//         <Typography>
//           Scan le{' '}
//           <span>
//             QR Code <br /> sur la Bouteille
//           </span>
//         </Typography>
//       </Stack>
//     </Box>
//   );
// };
