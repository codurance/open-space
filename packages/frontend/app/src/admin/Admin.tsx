import React, { useEffect, useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const Admin: React.FC = () => {
  const [isModalSpaceOn, setModalSpaceOn] = useState(false);
  const onAddSpace = () => {
    setModalSpaceOn(true);
    const space = {
      name: "",
      description: "",
      location: "",
      facilities: ""
    };
  };
  return (
    <>
      <div className="buttons">
        <Button className="add-space-button" onClick={() => onAddSpace()}>
          Add space
        </Button>
      </div>

      {/* <Modal open={isModalSpaceOn}>
      <Modal.Header>Session</Modal.Header>
      <Modal.Content style={modalStyle}>
        <SessionForm
          getSessions={getSessionResponse}
          sessionToEdit={sessionData}
          setIsEditing={setModalSessionOn}
        />
      </Modal.Content>
    </Modal> */}
    </>
  );
};

export default Admin;
