import express from "express";
import {
  ApplyLeave,
  DeleteLeave,
  EditLeave,
  GetLeave,
} from "../controllers/leave.controller.js";

const LeaveRouter = express.Router();

LeaveRouter.post("/leave", ApplyLeave);
LeaveRouter.get("/leave", GetLeave);
LeaveRouter.put("/leave", EditLeave);
LeaveRouter.delete("/leave", DeleteLeave);

export default LeaveRouter;
