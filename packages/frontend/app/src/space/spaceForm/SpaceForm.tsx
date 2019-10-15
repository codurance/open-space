import React, { useState } from "react";
import { postSpace } from "../api/spaceAPI";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import CSS from "csstype";
import { ISpace } from "../api/ISpace";

interface SpaceFormProps {
  setModalSpaceStatus: Function;
  isModalSpaceOn: boolean;
}

const SpaceForm: React.FC<SpaceFormProps> = ({
  setModalSpaceStatus,
  isModalSpaceOn
}) => {
  const [spaceName, setSpaceName] = useState();
  const [spaceDescription, setSpaceDescription] = useState();
  const [spaceLocation, setSpaceLocation] = useState();
  const [spaceFacilities, setSpaceFacilities] = useState();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const spaceToStore: ISpace = {
      name: spaceName,
      description: spaceDescription,
      location: spaceLocation,
      facilities: spaceFacilities
    };
    await postSpace(spaceToStore);
    setModalSpaceStatus(false);
  };

  const modalStyle: CSS.Properties = {
    background: "#666666"
  };

  return (
    <Modal open={isModalSpaceOn}>
      <Modal.Header>Spaces</Modal.Header>
      <Modal.Content style={modalStyle}>
        <Header>Create a Space</Header>
        <Form inverted onSubmit={event => submitForm(event)}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="name"
              value={spaceName}
              onChange={e => setSpaceName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="description"
              value={spaceDescription}
              onChange={e => setSpaceDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input
              placeholder="location"
              value={spaceLocation}
              onChange={e => setSpaceLocation(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Facilities</label>
            <input
              placeholder="facilities"
              value={spaceFacilities}
              onChange={e => setSpaceFacilities(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">Add</Button>
          <Button onClick={() => setModalSpaceStatus(false)}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SpaceForm;
