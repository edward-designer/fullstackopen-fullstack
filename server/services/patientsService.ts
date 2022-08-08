import patientsData from "../data/patients.json";

import { IPatients, IPatientsProtected } from "../types";

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

export default { getEntries };
