import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsService.getEntries());
});
router.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientsService.addPatient(newPatientEntry);
        res.json(newPatient);
    }catch(error){
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
          errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }

});

export default router;
