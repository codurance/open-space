import React, { useState } from "react";

import { ISession } from "../SessionContainer";
import { Button, Form, Header } from "semantic-ui-react";
import * as sessionAPI from "../api/sessionAPI";

interface SessionFormProps {
  getSessions: Function;
  sessionToEdit: ISession;
  setIsEditing: (isEditing: boolean) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({
  getSessions,
  sessionToEdit,
  setIsEditing
}) => {
  const [sessionTitle, setSessionTitle] = useState(sessionToEdit.title);
  const [sessionLocation, setSessionLocation] = useState(
    sessionToEdit.location
  );
  const [sessionTime, setSessionTime] = useState(sessionToEdit.time);
  const [sessionPresenter, setSessionPresenter] = useState(
    sessionToEdit.presenter
  );

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    sessionToEdit.title = sessionTitle;
    sessionToEdit.location = sessionLocation;
    sessionToEdit.time = sessionTime;
    sessionToEdit.presenter = sessionPresenter;

    let response: any;

    if (!sessionToEdit.id)
      response = await sessionAPI.postSession(sessionToEdit);
    else response = await sessionAPI.editSession(sessionToEdit);

    if (response.ok) {
      getSessions();
      setIsEditing(false);
    } else {
      //setError;
    }
  };

  return (
    <>
      <Header>Submit A Session</Header>
      <Form inverted onSubmit={event => submitForm(event)}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="title"
            value={sessionTitle}
            onChange={e => setSessionTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <input
            placeholder="location"
            value={sessionLocation}
            onChange={e => setSessionLocation(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Presenter</label>
          <input
            placeholder="presenter"
            value={sessionPresenter}
            onChange={e => setSessionPresenter(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Time</label>
          <input
            type="time"
            placeholder="time"
            value={sessionTime}
            onChange={e => setSessionTime(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">{!sessionToEdit.id ? "Add" : "Edit"}</Button>
        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
      </Form>
    </>
  );
};

export default SessionForm;
