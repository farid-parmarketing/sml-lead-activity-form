import express from "express";
const router = express.Router();
import { getDetails, saveDetails } from "../controller/linkOperations.js";

router.post("/getdetails", getDetails);
router.post("/savedetails", saveDetails);

export default router;
