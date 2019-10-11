import * as SpaceApi from "../api/spaceAPI";
import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Header
} from "semantic-ui-react";

const SpaceDropdown: React.FC<DropdownProps> = props => {
  const [spaceOptions, setSpaceOptions] = useState<DropdownItemProps[]>([]);
  const getSpaceOptions = async () => {
    const spaces = await SpaceApi.getSpaces();
    const options = spaces.map<DropdownItemProps>(value => ({
      key: value.id,
      value: value.id,
      text: value.name,
      content: <Header content={value.name} subheader={value.facilities} />
    }));
    setSpaceOptions(options);
  };

  useEffect(() => {
    getSpaceOptions();
  }, []);
  const finalProps: DropdownProps = {
    ...props,
    placeholder: "Space",
    search: true,
    clearable: true,
    selection: true,
    options: spaceOptions
  };
  const dropdown = <Dropdown {...finalProps} />;

  return dropdown;
};

export default SpaceDropdown;
