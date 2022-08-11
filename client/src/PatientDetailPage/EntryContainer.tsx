import React from "react";
import "./entryContainer.css";

interface IEntryContainer {
  type: string;
  children: JSX.Element;
}
const EntryContainer = ({ type, children }: IEntryContainer) => {
  return <div className={type}>{children}</div>;
};

export default EntryContainer;
