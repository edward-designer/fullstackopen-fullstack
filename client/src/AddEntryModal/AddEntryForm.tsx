import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { isDate } from "../Helper";

import {
  TextField,
  SelectField,
  TypeOption,
  DiagnosisSelection,
  HealthCheckRatingOption,
  SelectRatingField,
} from "./FormField";
import { Type, EntryToAdd, HealthCheckRating } from "../types";

interface Props {
  onSubmit: (values: EntryToAdd) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: Type.HealthCheck, label: "HealthCheck" },
];

const RatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        //no need to reinitialize after changing the type
        type: Type.Hospital,
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const formatError =
          "Input value is not a valid date (required format:YYYY-MM-DD)";

        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = formatError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === Type.Hospital) {
          if (!values.discharge.date) {
            errors["discharge.date"] = requiredError;
          } else if (!isDate(values.discharge.date)) {
            errors["discharge.date"] = formatError;
          }
          if (!values.discharge.criteria) {
            errors["discharge.criteria"] = requiredError;
          }
        }
        if (values.type === Type.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeave && values.sickLeave.startDate) {
            if (!isDate(values.sickLeave.startDate)) {
              errors["sickLeave.startDate"] = formatError;
            }
          }
          if (values.sickLeave && values.sickLeave.endDate) {
            if (!isDate(values.sickLeave.endDate)) {
              errors["sickLeave.endDate"] = formatError;
            }
          }
        }
        if (values.type === Type.HealthCheck) {
          if (values.healthCheckRating === undefined) {
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
      }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name of Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === Type.Hospital && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                  errors={errors}
                  touched={touched}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge reasons"
                  name="discharge.criteria"
                  component={TextField}
                  errors={errors}
                  touched={touched}
                />
              </>
            )}
            {values.type === Type.OccupationalHealthcare && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            {values.type === Type.HealthCheck && (
              <>
                <SelectRatingField
                  label="Health Check Rating"
                  name="healthCheckRating"
                  options={RatingOptions}
                />
              </>
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
