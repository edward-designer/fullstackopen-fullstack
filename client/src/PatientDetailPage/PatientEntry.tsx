import React from "react";

import { assertNever } from "../Helper";
import { Entry, Type } from "../types";
import EntryContainer from "./EntryContainer";
import HealthRatingBar from "../components/HealthRatingBar";

const PatientEntry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case Type.Hospital:
      return (
        <EntryContainer type="hospital">
          <>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
            <p>discharge date: {entry.discharge.date}</p>
          </>
        </EntryContainer>
      );
    case Type.OccupationalHealthcare:
      return (
        <EntryContainer type="occupationalHealthcare">
          <>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
            {entry.sickLeave && (
              <p>
                sick leave period: {entry.sickLeave.startDate} {" - "}
                {entry.sickLeave.endDate}
              </p>
            )}
          </>
        </EntryContainer>
      );
    case Type.HealthCheck:
      return (
        <EntryContainer type="healthCheck">
          <>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>
              rating:{" "}
              <HealthRatingBar
                rating={entry.healthCheckRating}
                showText={true}
              />
            </p>
            <p>diagnose by {entry.specialist}</p>
          </>
        </EntryContainer>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;
