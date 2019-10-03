import React, { useEffect, useState, FC } from "react";
import { get, IHttpResponse } from "../common/http";
import { Modal, Button } from "semantic-ui-react";

import Sessions from "./Sessions";
import SessionEditForm from "./sessionForm/SessionEditForm";
import CSS from "csstype";

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
  }

  const modalStyle: CSS.Properties = {
    backgroundColor: "#FF9900"
  };

  const onAddSession = () => {
    console.log("is editing to true");
    setIsEditing(true);
    const session = {
      title: "",
      location: "",
      time: "",
      presenter: ""
    };

    setSessionToEdit(session);
  };

  return (
    <>
      <Button onClick={() => onAddSession()}>Add session</Button>
      <Modal style={modalStyle} open={isEditing}>
        <Modal.Header>Session</Modal.Header>
        <Modal.Content>{currentForm}</Modal.Content>
      </Modal>
      <Sessions
        sessions={sessions}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        setSessionToEdit={setSessionToEdit}
        getSessions={getSessionResponse}
      />
    </>
  );
};

export default SessionContainer;
