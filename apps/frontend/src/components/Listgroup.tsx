import { Image, ListGroup } from "react-bootstrap";
import { v4 } from "uuid";
import { ICounts } from "../interfaces/ICounts";

interface IProps {
  title: string;
  data: Array<ICounts>;
  end_time: string;
}

function Listgroup({ title, data, end_time }: IProps): React.ReactNode {
  return (
    <>
      <h5 className="text-center">{title}</h5>
      <ListGroup className="mb-5">
        {data.map(({ category_name, counts }) => (
          <ListGroup.Item key={v4()} action className="d-flex gap-3 py-3">
            <Image src="/rsystfip.svg" alt="twbs" width="32" height="27" />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">{category_name}</h6>
                <p className="mb-0 opacity-75">{counts}</p>
              </div>
              <small className="opacity-50 text-nowrap">{end_time}</small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Listgroup;
