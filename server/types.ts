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
  gender: string;
  occupation: string;
};

export type IPatientsProtected = Omit<IPatients, "ssn">;
