import React, { useEffect, useState, FC } from "react";
import { get, IHttpResponse } from "../common/http";

import Sessions from "./Sessions";
import SessionForm from "./SessionForm";
import SessionEditForm from "./SessionEditForm";

export interface ISession {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
}

const SessionContainer: FC = () => {
  const [sessions, setSessions] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState();

  const getSessionResponse = async () => {
    const getSessionResponse = await get<IHttpResponse<ISession[]>>(
      `/api/sessions`
    );
    const sessions = getSessionResponse.parsedBody;
    setSessions(sessions);
  };

  useEffect(() => {
    getSessionResponse();
  }, []);

  let currentForm;
  if (isEditing) {
    currentForm = (
      <SessionEditForm
        getSessions={getSessionResponse}
        sessionToEdit={sessionToEdit}
        setIsEditing={setIsEditing}
      />
    );
  } else {
    currentForm = <SessionForm getSessions={getSessionResponse} />;
  }

  return (
    <>
      <Sessions
        sessions={sessions}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        setSessionToEdit={setSessionToEdit}
        getSessions={getSessionResponse}
      />
      {currentForm}
    </>
  );
};

export default SessionContainer;
