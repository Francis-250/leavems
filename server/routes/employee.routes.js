import express from "express";
import {
  AddEmployee,
  deleteEmployee,
  getEmployee,
} from "../controllers/employee.controller.js";

const EmployeeRouter = express.Router();

EmployeeRouter.post("/employees", AddEmployee);
EmployeeRouter.get("/employees", getEmployee);
EmployeeRouter.delete("/employees/:id", deleteEmployee);

export default EmployeeRouter;
