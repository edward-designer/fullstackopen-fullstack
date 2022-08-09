import { v1 as uuid } from "uuid";

import patientsData from "../data/patients.json";

import { IPatients, IPatientsProtected, IPatientToAdd } from "../types";

const patients: Array<IPatients> = patientsData as Array<IPatients>;

const getEntries = (): Array<IPatientsProtected> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const addPatient = (patient: IPatientToAdd): IPatients => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, addPatient };
