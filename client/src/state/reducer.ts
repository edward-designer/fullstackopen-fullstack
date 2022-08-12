import { State } from "./state";
import { Patient, Entry, Diagnosis, Type } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT_DETAIL";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_NEW_ENTRY";
      payload: { id: string; entry: Entry };
    }
  | {
      type: "SET_DIAGNOSIS_TYPES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_PATIENT_DETAIL":
      const detailsId = action.payload.id;
      const patientsWithDetailsAdded = { ...state.patients };
      patientsWithDetailsAdded[detailsId] = {
        ...action.payload,
      };
      return { ...state, patients: patientsWithDetailsAdded };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_NEW_ENTRY":
      const id = action.payload.id;
      const updatedPatients = { ...state.patients };
      updatedPatients[id]["entries"]?.push(action.payload.entry);
      if (
        action.payload.entry.type === Type.HealthCheck &&
        Number.isInteger(action.payload.entry.healthCheckRating)
      ) {
        updatedPatients[id]["healthCheckRating"] = Number(
          action.payload.entry.healthCheckRating
        );
      }
      return { ...state, patients: updatedPatients };
    case "SET_DIAGNOSIS_TYPES":
      return { ...state, diagnoses: [...action.payload] };
    default:
      return state;
  }
};
