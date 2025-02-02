import express from "express";
import {
  getSummary,
  getGenderDistribution,
  getSeniorCitizenDistribution,
  getTenureDistribution,
  getChurnDistribution,
  getContractDistribution,
  getInternetServiceDistribution,
  getCustomers,
  getCustomerById,
} from "../controllers/dash.controller.js";

const router = express.Router();

router.get("/summary", getSummary);
router.get("/gender", getGenderDistribution);
router.get("/seniorcitizen", getSeniorCitizenDistribution);
router.get("/tenure", getTenureDistribution);
router.get("/churn", getChurnDistribution);
router.get("/contract", getContractDistribution);
router.get("/internetservice", getInternetServiceDistribution);
router.get("/customers", getCustomers);
router.get("/customers/:userId", getCustomerById);

export default router;
