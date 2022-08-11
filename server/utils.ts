/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IPatientToAdd, Gender, EntryToAdd, HealthCheckRating } from "./types";

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: any): IPatientToAdd => {
  const newPatient: IPatientToAdd = {
    name: parseString({ name }),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString({ ssn }),
    gender: parseGender(gender),
    occupation: parseString({ occupation }),
  };
  return newPatient;
};

export default toNewPatientEntry;

export const newEntryHospital = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
}: any): EntryToAdd => {
  const newEntry: EntryToAdd = {
    date: parseDate(date),
    type: "Hospital",
    specialist: parseString({ specialist }),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    description: parseString({ description }),
    discharge: {
      date: parseDate(discharge.date),
      criteria: parseJustString(discharge.criteria),
    },
  };
  return newEntry;
};

export const newEntryOccupationalHealthcare = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickLeave: { startDate, endDate },
}: any): EntryToAdd => {
  const newEntry: EntryToAdd = {
    date: parseDate(date),
    type: "OccupationalHealthcare",
    specialist: parseString({ specialist }),
    employerName: parseString({ employerName }),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    description: parseString({ description }),
    sickLeave: { startDate: parseDate(startDate), endDate: parseDate(endDate) },
  };
  return newEntry;
};

export const newEntryHealthCheck = ({
  description,
  date,
  specialist,
  healthCheckRating,
}: any): EntryToAdd => {
  const newEntry: EntryToAdd = {
    date: parseDate(date),
    type: "HealthCheck",
    specialist: parseString({ specialist }),
    description: parseString({ description }),
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  };
  return newEntry;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (obj: any): string => {
  const [key, value] = Object.entries(obj)[0];
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${key}}`);
  }
  return value;
};
const parseJustString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing criteria}`);
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseDiagnosisCodes = (arr: any): string[] => {
  if (!(arr.length > 0) || !isArrOfString(arr)) {
    throw new Error(`Diagnosis Codes is formatted incorrectly`);
  }
  return arr;
};

const isArrOfString = (arr: Array<any>): arr is Array<string> => {
  return arr.every((el) => isString(el));
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};
