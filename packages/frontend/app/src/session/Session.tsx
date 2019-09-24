import * as React from "react";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
};

export const Session = ({
  id,
  title,
  location,
  time,
  presenter
}: SessionProps) => <div>{presenter}</div>;
