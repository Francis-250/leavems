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
    microsoftId: {
      type: String,
      unique: true,
      sparse: true,
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
    leaveBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    carriedOverDays: {
      type: Number,
      default: 0,
      max: 5,
    },
    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Employee = model("Employee", EmployeeSchema);
export default Employee;
