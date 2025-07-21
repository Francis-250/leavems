import express from "express";
import {
  ApplyLeave,
  DeleteLeave,
  EditStatus,
  GetLeave,
} from "../controllers/leave.controller.js";

const LeaveRouter = express.Router();

LeaveRouter.post("/leave", ApplyLeave);
LeaveRouter.get("/leave", GetLeave);
LeaveRouter.put("/leave/:id", EditStatus);
LeaveRouter.delete("/leave/:id", DeleteLeave);

export default LeaveRouter;
