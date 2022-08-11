import { v1 as uuid } from "uuid";

import patients from "../data/patients";

import {
  IPatients,
  IPatientsProtected,
  IPatientToAdd,
  IPatientDetails,
  EntryToAdd,
  Entry,
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
const isPatientAdded = (patientID: string): boolean => {
  return patients.some((patient) => patient.id === patientID);
};

const addMedicalEntry = (entry: EntryToAdd, patientId: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const thePatient = patients.filter((patient) => patient.id === patientId)[0];
  thePatient.entries && thePatient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getAPatient,
  addPatient,
  addMedicalEntry,
  isPatientAdded,
};
