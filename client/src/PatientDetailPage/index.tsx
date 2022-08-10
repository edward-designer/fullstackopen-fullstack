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
} from "@material-ui/core";

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
              {Object.entries(patient).map((item: [string, string]) => {
                if (item[0] !== "name" && item[0] !== "id") {
                  return (
                    <TableRow key={item[0]}>
                      <TableCell>
                        <strong>{item[0]}</strong>
                      </TableCell>
                      <TableCell>{item[1]}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default PatientDetailPage;
