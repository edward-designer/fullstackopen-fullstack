import { v1 as uuid } from "uuid";

import patients from "../data/patients";

import {
  IPatients,
  IPatientsProtected,
  IPatientToAdd,
  IPatientDetails,
} from "../types";

const getPatients = (): Array<IPatientsProtected> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const getAPatient = (requestId: string): IPatientDetails => {
  return patients
    .filter((patient) => patient.id === requestId)
    .map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }))[0];
};
const addPatient = (patient: IPatientToAdd): IPatients => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getAPatient, addPatient };
