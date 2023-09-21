import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { THandleClick } from '../types/THandleClicks';
import ProtectedElement from './ProtectedElement';

interface IProps {
  isEdit: boolean;
  isLoading: boolean;
}

function FooterFormPeople({ isEdit, isLoading }: IProps): React.ReactNode {
  const navigate: NavigateFunction = useNavigate();

  const handleClick = (e: THandleClick) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isEdit ? 'space-between' : 'flex-end',
      }}
    >
      <ProtectedElement isAllowed={isEdit}>
        <Button onClick={handleClick} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
      </ProtectedElement>

      <LoadingButton
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        sx={{ mt: 3, ml: 1 }}
      >
        {isEdit ? 'Actualizar' : 'Registrar'}
      </LoadingButton>
    </Box>
  );
}

export default FooterFormPeople;
