import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import SpaceForm from "./spaceForm/SpaceForm";
import SpaceCard from "./spaceCard/SpaceCard";

export interface ISpace {
  id?: number;
  name: string;
  description: string;
  location: string;
  facilities: string;
}

export interface ISpaceContainerProps {
  spaces: ISpace[];
}

const SpaceContainer: React.FC<ISpaceContainerProps> = props => {
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
      <React.Fragment>
        {props.spaces &&
          props.spaces.map((space: ISpace) => (
            <React.Fragment key={space.id}>
              <SpaceCard {...space} />
            </React.Fragment>
          ))}
      </React.Fragment>
    </>
  );
};

export default SpaceContainer;
