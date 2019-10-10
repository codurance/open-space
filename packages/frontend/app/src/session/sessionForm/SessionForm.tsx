import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import * as sessionAPI from "../api/sessionAPI";
import { useSessionsContext } from "../sessionsContext";

const SessionForm: React.FC = () => {
  const {
    setSessions,
    setCurrentSession,
    currentSession
  } = useSessionsContext();
  const editingSession = currentSession!;

  const [sessionTitle, setSessionTitle] = useState(editingSession.title);
  const [sessionSpaceId, setSessionSpaceId] = useState(
    editingSession.location.id!
  );
  const [sessionTime, setSessionTime] = useState(editingSession.time);
  const [sessionPresenter, setSessionPresenter] = useState(
    editingSession.presenter
  );

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const sessionToSubmit: sessionAPI.SessionRequestBody = {
      presenter: sessionPresenter,
      spaceId: sessionSpaceId,
      time: sessionTime,
      title: sessionTitle
    };

    let response: any;

    if (editingSession.id) {
      response = await sessionAPI.editSession(
        editingSession.id,
        sessionToSubmit!
      );
    } else {
      response = await sessionAPI.postSession(sessionToSubmit);
    }

    if (response.ok) {
      const updatedSessions = await sessionAPI.getSessions();
      if (updatedSessions) setSessions(updatedSessions);
      setCurrentSession(undefined);
    }
  };

  const onExitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentSession(undefined);
  };

  return (
    <Modal open={currentSession !== undefined}>
      <Modal.Header>
        {!editingSession.id ? "Submit" : "Edit"} A Session
      </Modal.Header>
      <Modal.Content>
        <Form inverted onSubmit={event => submitForm(event)}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="title"
              value={sessionTitle}
              onChange={e => setSessionTitle(e.target.value)}
            />
          </Form.Field>
          {
            <Form.Field>
              <label>Location</label>
              <input
                placeholder="location"
                value={sessionSpaceId}
                onChange={e =>
                  setSessionSpaceId(Number.parseInt(e.target.value))
                }
              />
            </Form.Field>
          }
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
          <Button type="submit">{!editingSession.id ? "Add" : "Edit"}</Button>
          <Button onClick={event => onExitForm(event)}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SessionForm;
