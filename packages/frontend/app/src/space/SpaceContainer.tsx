import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import SpaceForm from "./spaceForm/SpaceForm";

export interface ISpace {
  id?: number;
  name: string;
  description: string;
  location: string;
  facilities: string;
}

const SpaceContainer: React.FC = () => {
  const [isModalSpaceOn, setModalSpaceOn] = useState(false);

  const onAddSpace = () => {
    setModalSpaceOn(true);
  };

  return (
    <>
      <div className="buttons">
        <Button className="add-space-button" onClick={() => onAddSpace()}>
          Add space
        </Button>
      </div>

      <SpaceForm
        setModalSpaceStatus={setModalSpaceOn}
        isModalSpaceOn={isModalSpaceOn}
      />
    </>
  );
};

export default SpaceContainer;
