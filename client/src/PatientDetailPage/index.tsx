import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Table,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";

import PatientEntry from "./PatientEntry";
import { apiBaseUrl } from "../constants";
import { useStateValue, getPatientDetails } from "../state";
import { Patient } from "../types";

const PatientDetailPage = () => {
  const [state, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (typeof id === "string" && id !== "") {
      if (
        state.patients[id] &&
        state.patients[id].ssn &&
        state.patients[id].entries
      ) {
        setPatient(state.patients[id]);
      } else {
        const fetchPatientDetail = async () => {
          try {
            const { data: patientDetailFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            setPatient(patientDetailFromApi);

            dispatch(getPatientDetails(patientDetailFromApi));
          } catch (error: unknown) {
            let errorMessage = "Something went wrong.";
            if (axios.isAxiosError(error) && error.response) {
              errorMessage += ` Error: ${String(error.response.data.message)}`;
            }
            console.error(errorMessage);
          }
        };
        void fetchPatientDetail();
      }
    }
  }, [id]);

  return (
    <div className="App">
      {patient && (
        <>
          <Box>
            <Typography align="center" variant="h4">
              {patient.name}
            </Typography>
          </Box>
          <Table style={{ marginBottom: "1em" }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>ssn</strong>
                </TableCell>
                <TableCell>{patient.ssn}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Date of Birth</strong>
                </TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Occupation</strong>
                </TableCell>
                <TableCell>{patient.occupation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Gender</strong>
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Entries</strong>
                </TableCell>
                <TableCell>
                  {patient.entries &&
                    patient.entries.map((entry) => (
                      <PatientEntry key={entry.id} entry={entry} />
                    ))}
                  <Button variant="contained">Add Entry</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default PatientDetailPage;
