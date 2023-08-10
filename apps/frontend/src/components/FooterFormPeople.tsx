import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Col, Spinner } from 'react-bootstrap';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { THandleClick } from '../types/THandleClicks';
import ProtectedElement from './ProtectedElement';

interface IProps {
  isAllowed: boolean;
  isLoading: boolean;
}

function FooterFormPeople({ isAllowed, isLoading }: IProps): React.ReactNode {
  const navigate: NavigateFunction = useNavigate();

  const handleClick = (e: THandleClick) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Col md={12}>
      <Button className="m-1" disabled={isLoading} type="submit">
        {!isLoading ? (
          <>
            Registrar <AddIcon />
          </>
        ) : (
          <Spinner size="sm" />
        )}
      </Button>
      <ProtectedElement isAllowed={isAllowed}>
        <Button
          variant="light"
          onClick={handleClick}
          className="m-1"
          type="submit"
        >
          Volver <ArrowBackIcon />
        </Button>
      </ProtectedElement>
    </Col>
  );
}

export default FooterFormPeople;
