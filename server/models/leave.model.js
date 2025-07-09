import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LeaveSchema = new Schema(
  {
    employee: {
      type: String,
      required: [true, "employee is required"],
    },
    leaveType: {
      type: String,
      enum: [
        "PTO",
        "Sick",
        "Maternity",
        "Compassionate",
        "Unpaid",
        "Bereavement",
      ],
      required: [true, "leave type is required"],
    },
    startDate: { type: Date, required: [true, "startDate is required"] },
    endDate: { type: Date, required: [true, "endDate is required"] },
    reason: { type: String, required: [true, "reason is required"] },
    documents: { type: String, required: false },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

const Leave = model("Leave", LeaveSchema);
export default Leave;
