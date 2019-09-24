import React, { useState, FC} from 'react';

const SessionForm: FC = () => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionLocation, setSessionLocation] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionPresenter, setSessionPresenter] = useState("");

  const postSession = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(sessionTitle);
    console.log(sessionLocation);
    console.log(sessionTime);
    console.log(sessionPresenter);
  }

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
          <input type="submit" value="Submit" />
        </form>
  )
}


export default SessionForm;
