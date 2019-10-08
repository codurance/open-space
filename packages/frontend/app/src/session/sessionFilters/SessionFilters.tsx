import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useSessionsContext } from "../sessionsContext";
import "./SessionFilters.css";

const SessionsFilters: React.FC = () => {
  const { setSessionTypesToFilter } = useSessionsContext();

  const options = [
    { key: "1", text: "Location 1", value: "Location 1" },
    { key: "2", text: "Location 2", value: "Location 2" },
    { key: "3", text: "Location 3", value: "Location 3" },
    { key: "4", text: "Location 4", value: "Location 4" }
  ];

  return (
    <>
      <Dropdown
        className="dropdown"
        placeholder="Location(Temporary)"
        multiple
        selection
        options={options}
        onChange={(_event, data) => {
          setSessionTypesToFilter!(data.value);
        }}
      />
    </>
  );
};

export default SessionsFilters;
