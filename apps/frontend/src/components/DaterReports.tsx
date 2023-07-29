import { useEffect } from "react";
import {
  Col,
  FloatingLabel,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import { UNSET_STATUS } from "../constants";
import { QueryData, setQueryData } from "../features/reports/reportsSlice";
import { setCategories } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ICategory } from "../interfaces/IResources";
import { notify } from "../libs/toast";
import * as categoryService from "../services/category.service";
import { THandleChangeITS } from "../types/THandleChanges";
import FetcherReports from "./FetcherReports";

interface IProps {
  errorReports: boolean;
}

function DaterReports({ errorReports }: IProps): React.ReactNode {
  const dispatch = useAppDispatch();

  const categoriesState: Array<ICategory> = useAppSelector(
    ({ resources }) => resources.categories
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  );

  const handleChange = (e: THandleChangeITS) => {
    dispatch(
      setQueryData({
        ...queryDataState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const { data, error } = useQuery<[], any>(
    "categories",
    categoryService.getCategories
  );

  useEffect(() => {
    if (data) dispatch(setCategories(data));
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  return (
    <Row className="g-3 mb-5">
      <Col md={2}>
        <FloatingLabel label="Desde:">
          <FormControl
            name="start_time"
            className="border-0 bg-white"
            onChange={handleChange}
            value={queryDataState.start_time}
            type="date"
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Hasta:">
          <FormControl
            name="end_time"
            className="border-0 bg-white"
            onChange={handleChange}
            value={queryDataState.end_time}
            type="date"
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Persona:">
          <FormSelect
            name="category_id"
            className="border-0 bg-white"
            onChange={handleChange}
            value={queryDataState.category_id}
          >
            <option value={UNSET_STATUS}>Todos</option>
            {categoriesState.map(({ id, category_name }) => (
              <option key={v4()} value={id}>
                {category_name}
              </option>
            ))}
          </FormSelect>
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FetcherReports errorReports={errorReports} />
      </Col>
    </Row>
  );
}

export default DaterReports;
