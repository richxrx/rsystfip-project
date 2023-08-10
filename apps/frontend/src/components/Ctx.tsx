import Box from '@mui/material/Box';

interface IProps {
  ctxRef: React.RefObject<HTMLCanvasElement>;
}

function Ctx({ ctxRef }: IProps): React.ReactNode {
  return (
    <Box
      component="canvas"
      ref={ctxRef}
      sx={{ width: 700, height: 400, marginY: 5 }}
    />
  );
}

export default Ctx;
