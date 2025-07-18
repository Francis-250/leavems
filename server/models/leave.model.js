import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LeaveSchema = new Schema(
  {
    employee: {
      type: String,
      required: [false, "employee is required"],
    },
    leaveType: {
      type: String,
      required: [true, "leave type is required"],
    },
    startDate: { type: Date, required: [true, "startDate is required"] },
    endDate: { type: Date, required: [true, "endDate is required"] },
    reason: { type: String, required: [true, "reason is required"] },
    documents: { type: String, required: false },
    status: {
      type: String,
      default: "Pending",
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    rejectionReason: { type: String, required: false },
  },
  { timestamps: true }
);

const Leave = model("Leave", LeaveSchema);
export default Leave;
