import React, { useState, useContext } from "react";
import { Modal, Button, Form, Header } from "semantic-ui-react";
import * as sessionAPI from "../api/sessionAPI";
import SessionsContext from "../sessionsContext";

const SessionForm: React.FC = () => {
  const { setSessions, setCurrentSession, currentSession } = useContext(
    SessionsContext
  );

  const [sessionTitle, setSessionTitle] = useState(currentSession!.title);
  const [sessionLocation, setSessionLocation] = useState(
    currentSession!.location
  );
  const [sessionTime, setSessionTime] = useState(currentSession!.time);
  const [sessionPresenter, setSessionPresenter] = useState(
    currentSession!.presenter
  );

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    currentSession!.title = sessionTitle;
    currentSession!.location = sessionLocation;
    currentSession!.time = sessionTime;
    currentSession!.presenter = sessionPresenter;

    let response: any;

    if (!currentSession!.id)
      response = await sessionAPI.postSession(currentSession!);
    else response = await sessionAPI.editSession(currentSession!);

    if (response.ok) {
      const updatedSessions = await sessionAPI.getSessions();
      if (updatedSessions) setSessions(updatedSessions);
      setCurrentSession(undefined);
    }
  };

  return (
    <Modal open={true}>
      <Modal.Header>Session</Modal.Header>
      <Modal.Content>
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
          <Button type="submit">{!currentSession!.id ? "Add" : "Edit"}</Button>
          <Button onClick={() => setCurrentSession(undefined)}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SessionForm;
