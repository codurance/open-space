import * as React from "react";
import { deleteSession } from "../common/http";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
  getSessions?: Function;
};

const deleteSessionById = async (id: Number, getSessions: Function | undefined) => {
  await deleteSession(`/api/sessions/` + id).then(() => {
    if (getSessions !== undefined) getSessions();
  })
}

export const Session = ({
  id,
  title,
  location,
  time,
  presenter,
  getSessions
}: SessionProps) => {
  return (
    <div>
      <div className="session">{title}, {location}, {time}, {presenter}</div>
      <button className="delete-session" onClick={() => deleteSessionById(id, getSessions)}>Delete</button>
    </div>
  )
}
