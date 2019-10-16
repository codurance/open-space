import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import SpaceForm from "./spaceForm/SpaceForm";
import SpaceCard from "./spaceCard/SpaceCard";
import * as spaceAPI from "./api/spaceAPI";
import { ISpace } from "./api/ISpace";
import * as localStorageHelper from "../common/localStorageHelper";

const SpaceContainer: React.FC = () => {
  const [isModalSpaceOn, setModalSpaceOn] = useState(false);
  const [spaces, setSpaces] = useState();

  const getSpaces = async () => {
    const spacesResult = await spaceAPI.getSpaces();
    setSpaces(spacesResult);
  };

  const onAddSpace = () => {
    setModalSpaceOn(true);
  };

  const checkIfLoggedIn: Function = (): Promise<void> => {
    return new Promise(resolve => {
      localStorageHelper.isUserLoggedIn().then((answer: Boolean) => {
        if (!answer) document.location.href = "/login";
        resolve();
      });
    });
  };

  useEffect(() => {
    checkIfLoggedIn().then(() => getSpaces());
  }, []);

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
