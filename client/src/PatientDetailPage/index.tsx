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

import AddEntryModal from "../AddEntryModal";

import PatientEntry from "./PatientEntry";
import { apiBaseUrl } from "../constants";
import {
  useStateValue,
  getPatientDetails,
  addNewEntry,
  setDiagnosesTypes,
} from "../state";
import { Patient, Entry, EntryToAdd, Diagnosis } from "../types";

const PatientDetailPage = () => {
  const [state, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryToAdd) => {
    if (typeof id === "string" && id !== "") {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addNewEntry({ id, entry: newEntry }));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(
            String(e?.response?.data?.error) || "Unrecognized axios error"
          );
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };

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

  useEffect(() => {
    const fetchDiagnosesTypes = async () => {
      try {
        const { data: diagnosesTypes } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesTypes(diagnosesTypes));
      } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(error) && error.response) {
          errorMessage += ` Error: ${String(error.response.data.message)}`;
        }
        console.error(errorMessage);
      }
    };
    void fetchDiagnosesTypes();
  }, []);

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
                  <AddEntryModal
                    modalOpen={modalOpen}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                  />
                  <Button variant="contained" onClick={() => openModal()}>
                    Add Entry
                  </Button>
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
