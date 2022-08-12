import React, { createContext, useContext, useReducer } from "react";
import { Patient, Entry, Diagnosis } from "../types";
import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: Diagnosis[];
};

/* OR define as a Map for stricter type checking 
interface State {
  patients: Map<string, Patient>;
}
*/

const initialState: State = {
  patients: {},
  diagnoses: [],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (payload: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload,
});

export const getPatientDetails = (payload: Patient): Action => ({
  type: "SET_PATIENT_DETAIL",
  payload,
});

export const addNewPatient = (payload: Patient): Action => ({
  type: "ADD_PATIENT",
  payload,
});

export const addNewEntry = (payload: { id: string; entry: Entry }): Action => ({
  type: "ADD_NEW_ENTRY",
  payload,
});

export const setDiagnosesTypes = (payload: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_TYPES",
  payload,
});
