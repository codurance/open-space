import React, { useState } from "react";
import { ISpace, postSpace } from "./api/spaceAPI";

import { Button, Form, Header } from "semantic-ui-react";

interface SpaceFormProps {
  setIsEditing: (isEditing: boolean) => void;
}

const SpaceForm: React.FC<SpaceFormProps> = ({ setIsEditing }) => {
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
    postSpace(spaceToStore);
  };

  return (
    <>
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
        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
      </Form>
    </>
  );
};

export default SpaceForm;
