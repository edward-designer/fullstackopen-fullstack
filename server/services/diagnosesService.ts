import diagnosesData from "../data/diagnoses.json";

import { IDiagnoses } from "../types";

const diagnoses: Array<IDiagnoses> = diagnosesData as Array<IDiagnoses>;

const getEntries = (): Array<IDiagnoses> => {
  return diagnoses;
};

export default { getEntries };
