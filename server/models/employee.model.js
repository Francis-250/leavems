import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: ["HR", "Engineering", "Finance", "Operations", "Marketing"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
    },
    hireDate: {
      type: Date,
      required: [true, "Hire date is required"],
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Employee = model("Employee", EmployeeSchema);
export default Employee;
