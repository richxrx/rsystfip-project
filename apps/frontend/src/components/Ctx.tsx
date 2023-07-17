interface IProps {
  ctxRef: React.RefObject<HTMLCanvasElement>;
}

function Ctx({ ctxRef }: IProps): React.JSX.Element {
  return <canvas ref={ctxRef} width="700" height="400" />;
}

export default Ctx;
