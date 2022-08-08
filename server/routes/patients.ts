import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsService.getEntries());
});

export default router;