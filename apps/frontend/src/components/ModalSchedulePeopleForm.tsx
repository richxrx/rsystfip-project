import { Modal } from 'react-bootstrap';
import FormSchedulePeople, { propsAction } from './FormSchedulePeople';

interface IProps {
  stateModalScheduling: boolean;
  closeModalScheduling: () => void;
}

function ModalSchedulePeopleForm({
  stateModalScheduling,
  closeModalScheduling,
}: IProps): React.ReactNode {
  return (
    <Modal
      show={stateModalScheduling}
      onHide={closeModalScheduling}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Agendamiento Programado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormSchedulePeople
          action={propsAction.schedule}
          closeModalScheduling={closeModalScheduling}
        />
      </Modal.Body>
    </Modal>
  );
}

export default ModalSchedulePeopleForm;
