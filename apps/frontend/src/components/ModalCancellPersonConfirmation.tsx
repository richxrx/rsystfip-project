import { Modal } from "react-bootstrap";
import FormCancellPerson from "./FormCancellPerson";

interface IProps {
  stateModalCancell: boolean;
  closeModalCancell: () => void;
}

function ModalCancellPersonConfirmation({
  stateModalCancell,
  closeModalCancell,
}: IProps): React.ReactNode {
  return (
    <Modal
      show={stateModalCancell}
      onHide={closeModalCancell}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cancelar cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Estás seguro que deseas cancelar ésta cita?
        <FormCancellPerson closeModalCancell={closeModalCancell} />
      </Modal.Body>
    </Modal>
  );
}

export default ModalCancellPersonConfirmation;
