export enum Gender {
  Male = "male",
  Female = "Female",
  Other = "other",
}

export type IDiagnoses = {
  code: string;
  name: string;
  latin?: string;
};

export type IPatients = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type IPatientsProtected = Omit<IPatients, "ssn">;

export type IPatientToAdd = Omit<IPatients, "id">;
