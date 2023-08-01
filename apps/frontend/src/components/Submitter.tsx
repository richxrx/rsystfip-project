import { Button } from 'react-bootstrap';

interface IProps {
  children: React.ReactNode;
  loading: boolean;
}

function Submitter({ children, loading }: IProps): React.ReactNode {
  return (
    <Button className="my-2" disabled={loading} type="submit">
      {children}
    </Button>
  );
}

export default Submitter;
