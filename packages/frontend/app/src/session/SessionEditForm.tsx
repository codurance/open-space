import React, { useState, FC } from "react";
import { put } from "../common/http";
import { ISession } from "./SessionContainer";
import { Button, Form, Header } from "semantic-ui-react";

interface SessionEditFormProps {
  getSessions: any;
  sessionToEdit: ISession;
  setIsEditing: (isEditing: boolean) => void;
}

const SessionEditForm: FC<SessionEditFormProps> = ({
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
    <>
      <Header>Submit A Session</Header>
      <Form inverted onSubmit={event => postSession(event)}>
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
        <Button type="submit">Edit</Button>
        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
      </Form>
    </>
  );
};

export default SessionEditForm;
