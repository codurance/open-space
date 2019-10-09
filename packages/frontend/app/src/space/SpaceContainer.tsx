import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import SpaceForm from "./spaceForm/SpaceForm";
import * as spaceAPI from "./api/spaceAPI";
import SpaceCard from "./spaceCard/SpaceCard";

export interface ISpace {
  id?: number;
  name: string;
  description: string;
  location: string;
  facilities: string;
}

const SpaceContainer: React.FC = () => {
  const [spaces, setSpaces] = useState();
  const [isModalSpaceOn, setModalSpaceOn] = useState(false);

  const getSpaces = async () => {
    const spacesResult = await spaceAPI.getSpaces();
    setSpaces(spacesResult);
  };

  useEffect(() => {
    getSpaces();
  }, []);

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
      <React.Fragment>
        {spaces &&
          spaces.map((space: ISpace) => (
            <React.Fragment key={space.id}>
              <SpaceCard {...space} />
            </React.Fragment>
          ))}
      </React.Fragment>
    </>
  );
};

export default SpaceContainer;
