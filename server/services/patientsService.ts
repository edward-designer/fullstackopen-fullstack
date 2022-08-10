import { v1 as uuid } from "uuid";

import patientsData from "../data/patients.json";

import {
  IPatients,
  IPatientsProtected,
  IPatientToAdd,
  IPatientDetails,
} from "../types";

const patients: Array<IPatients> = patientsData as Array<IPatients>;

const getEntries = (): string[] => [];

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
    .map(({ id, name, ssn, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries: getEntries(),
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
