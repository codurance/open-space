import React from "react";
import { Button, Modal } from "semantic-ui-react";

export type ConfirmationProps = {
  onClose: Function;
  onConfirm: Function;
};

const SessionDeleteConfirmation = ({
  onClose,
  onConfirm
}: ConfirmationProps) => {
  return (
    <Modal open={true}>
      <Modal.Header>Delete Session</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this session?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => onClose(false)}>
          No
        </Button>
        <Button positive onClick={() => onConfirm()}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SessionDeleteConfirmation;
