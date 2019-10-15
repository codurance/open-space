import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useSessionsContext } from "../sessionsContext";
import "./SessionFilters.css";
import { SESSION_TYPES } from "../sessionTypes";

const SessionsFilters: React.FC = () => {
  const { setSessionTypesToFilter } = useSessionsContext();

  return (
    <>
      <Dropdown
        className="dropdown"
        placeholder="Types"
        multiple
        selection
        options={SESSION_TYPES}
        onChange={(_event, data) => {
          setSessionTypesToFilter!(data.value);
        }}
      />
    </>
  );
};

export default SessionsFilters;
