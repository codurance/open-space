import * as React from "react";
import { deleteSession, get } from "../common/http";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
  getSessions: Function;
};

const deleteSessionById = async (id: Number, getSessions: Function)=>{
  await deleteSession(`/api/sessions/`+id).then(()=> getSessions());
}

export const Session = ({
  id,
  title,
  location,
  time,
  presenter,
  getSessions
}: SessionProps) => <div className="session">{title}, {location}, {time}, {presenter}<button onClick={() => deleteSessionById(id, getSessions)}>Delete</button></div>;
