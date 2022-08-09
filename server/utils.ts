/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IPatientToAdd, Gender } from "./types";

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

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (obj: any): string => {
  const [key, value] = Object.entries(obj)[0];
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${key}}`);
  }
  return value;
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
