import React, { useState, FC } from "react";
// import { post } from "../common/http";
import { put } from "../common/http";
import { ISession } from "./SessionContainer";

interface SessionEditFormProps {
  getSessions: any,
  sessionToEdit: ISession,
  setIsEditing: (isEditing: boolean) => void,
}

const SessionEditForm: FC<SessionEditFormProps> = ({ getSessions, sessionToEdit, setIsEditing }) => {
  const [sessionTitle, setSessionTitle] = useState(sessionToEdit.title);
  const [sessionLocation, setSessionLocation] = useState(sessionToEdit.location);
  const [sessionTime, setSessionTime] = useState(sessionToEdit.time);
  const [sessionPresenter, setSessionPresenter] = useState(sessionToEdit.presenter);


  const postSession = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await put(`/api/sessions/${sessionToEdit.id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: sessionTitle,
        location: sessionLocation,
        time: sessionTime,
        presenter: sessionPresenter
      })
    });

    if (response.ok) {
      getSessions();
      setIsEditing(false);
    } else {
      //setError;
    }
  };

  return (
    <form onSubmit={event => postSession(event)}>
      <label>
        Title:
        <input
          type="text"
          value={sessionTitle}
          onChange={e => setSessionTitle(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={sessionLocation}
          onChange={e => setSessionLocation(e.target.value)}
        />
      </label>
      <label>
        Presenter:
        <input
          type="text"
          value={sessionPresenter}
          onChange={e => setSessionPresenter(e.target.value)}
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          value={sessionTime}
          onChange={e => setSessionTime(e.target.value)}
        />
      </label>
      <input type="submit" value="Edit" />
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default SessionEditForm;
