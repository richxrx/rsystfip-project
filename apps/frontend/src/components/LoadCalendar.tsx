import { Spinner } from 'react-bootstrap';

interface IProps {
  loadEventsRef: React.RefObject<HTMLDivElement>;
}

function LoadCalendar({ loadEventsRef }: IProps): React.ReactNode {
  return (
    <div className="load-events" ref={loadEventsRef}>
      Cargando <Spinner size="sm" />
    </div>
  );
}

export default LoadCalendar;
