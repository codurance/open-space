import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import * as sessionAPI from "../api/sessionAPI";
import SessionsContext, { ISession } from "../sessionsContext";

const SessionForm: React.FC = () => {
  const { state, dispatch } = useContext(SessionsContext);

  const [sessionTitle, setSessionTitle] = useState(state.currentSession!.title);
  const [sessionTime, setSessionTime] = useState(state.currentSession!.time);
  const [sessionPresenter, setSessionPresenter] = useState(
    state.currentSession!.presenter
  );

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const submitedSession: ISession = {
      id: state.currentSession!.id,
      title: sessionTitle,
      time: sessionTime,
      presenter: sessionPresenter
    };

    let response: any;

    if (!submitedSession.id)
      response = await sessionAPI.postSession(submitedSession);
    else response = await sessionAPI.editSession(submitedSession);

    if (response.ok) {
      const updatedSessions: ISession[] = ((await sessionAPI.getSessions()) as unknown) as ISession[];
      if (updatedSessions)
        dispatch({ type: "setSessions", payload: updatedSessions });

      dispatch({ type: "setCurrentSession", payload: undefined });
    }
  };

  const onExitForm = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: "setCurrentSession", payload: undefined });
  };

  return (
    <Modal open={state.currentSession !== undefined}>
      <Modal.Header>
        {state.currentSession && state.currentSession.id ? "Submit" : "Edit"} A
        Session
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
          <Button type="submit">
            {!(state.currentSession && state.currentSession.id)
              ? "Add"
              : "Edit"}
          </Button>
          <Button onClick={event => onExitForm(event)}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SessionForm;
