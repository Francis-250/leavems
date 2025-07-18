import Leave from "../models/Leave.model.js";

export const ApplyLeave = async (req, res) => {
  try {
    const newLeave = new Leave(req.body);
    await newLeave.save();
    res.status(201).json({ message: "Leave created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
};

export const GetLeave = async (req, res) => {
  try {
    const leaves = await Leave.find({});
    res.status(200).json(leaves);
  } catch (error) {
    console.log("error");
  }
};

export const EditLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLeave = await Leave.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave not found" });
    }
    res
      .status(200)
      .json({ message: "Leave updated successfully", leave: updatedLeave });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update leave" });
  }
};

export const EditStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be one of: pending, approved, rejected",
      });
    }
    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave record not found" });
    }

    res.status(200).json({
      message: "Leave status updated successfully",
      leave: updatedLeave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update leave" });
  }
};

export const DeleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    await Leave.findByIdAndDelete(id);
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete leave" });
  }
};
