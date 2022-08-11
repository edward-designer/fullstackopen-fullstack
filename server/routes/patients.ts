import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry, {
  newEntryHospital,
  newEntryOccupationalHealthcare,
  newEntryHealthCheck,
} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsService.getPatients());
});
router.get("/:id", (req, res) => {
  if (req.params.id && typeof req.params.id === "string") {
    res.json(patientsService.getAPatient(req.params.id));
  } else {
    res.status(400).send("Incorrect patient id");
  }
});
router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientsService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
router.post("/:id/entries", (req, res) => {
  if (!req.body.type) {
    res.status(400).send("Not the right entry type.");
  }
  const patientId = req.params.id;
  if (!patientsService.isPatientAdded(patientId)) {
    res.status(400).send("Patient is not in record.");
  }
  let newEntryToAdd;
  let newEntry;
  switch (req.body.type) {
    case "Hospital":
      newEntryToAdd = newEntryHospital(req.body);
      newEntry = patientsService.addMedicalEntry(newEntryToAdd, patientId);
      res.json(newEntry);
      break;
    case "OccupationalHealthcare":
      newEntryToAdd = newEntryOccupationalHealthcare(req.body);
      newEntry = patientsService.addMedicalEntry(newEntryToAdd, patientId);
      res.json(newEntry);
      break;
    case "HealthCheck":
      newEntryToAdd = newEntryHealthCheck(req.body);
      newEntry = patientsService.addMedicalEntry(newEntryToAdd, patientId);
      res.json(newEntry);
      break;
    default:
      res.status(400).send("Not the right entry type.");
  }
});

export default router;
