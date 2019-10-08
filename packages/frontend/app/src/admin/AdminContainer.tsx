import React, { useEffect, useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import SpaceForm from "../space/SpaceForm";

import CSS from "csstype";

export interface ISpace {
  id: number;
  name: string;
  description: string;
  location: string;
  facilities: string;
}

const AdminContainer: React.FC = () => {
  const [isModalSpaceOn, setModalSpaceOn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onAddSpace = () => {
    setModalSpaceOn(true);
    const space = {
      name: "",
      description: "",
      location: "",
      facilities: ""
    };
  };

  const modalStyle: CSS.Properties = {
    background: "#666666"
  };

  return (
    <>
      <div className="buttons">
        <Button className="add-space-button" onClick={() => onAddSpace()}>
          Add space
        </Button>
      </div>

      <Modal open={isModalSpaceOn}>
        <Modal.Header>Spaces</Modal.Header>
        <Modal.Content style={modalStyle}>
          <SpaceForm setIsEditing={setModalSpaceOn} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AdminContainer;
