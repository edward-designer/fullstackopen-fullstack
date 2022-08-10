export enum Gender {
  Male = "male",
  Female = "Female",
  Other = "other",
}

export interface IDiagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface IPatients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type IPatientDetails = IPatients | { entries: Entry[] };

export type IPatientsProtected = Omit<IPatients, "ssn">;

export type IPatientToAdd = Omit<IPatients, "id">;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}
