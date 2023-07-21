import { Button, Col } from "react-bootstrap";

interface IProps {
  children: React.ReactNode;
  loading: boolean;
}

function Submitter({ children, loading }: IProps): React.ReactNode {
  return (
    <Col md={6}>
      <Button className="my-2" disabled={loading} type="submit">
        {children}
      </Button>
    </Col>
  );
}

export default Submitter;
