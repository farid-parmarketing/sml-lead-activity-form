import express from "express";
const router = express.Router();
import {
  addLeadActivity,
  getAllLeadActivity,
  getSingleLeadActivity,
  deleteLeadActivity,
} from "../controller/leadActivity.js";

router.post("/leadactivity", addLeadActivity);
router.get("/leadactivity", getAllLeadActivity);
router.get("/leadactivity/:email", getSingleLeadActivity);
router.delete("/leadactivity/:id", deleteLeadActivity);

export default router;
