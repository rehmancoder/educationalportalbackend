import prisma from "../db/db.config.js";
export const labelData = async (req, res) => {
  if (req.method === "POST") {
    const { TrackingId } = req.body;

    try {
      // Create a new record in the database
      const newRecord = await prisma.label.create({
        data: {
          TrackingId,
        },
      });

      // Respond with the created record
      res.status(201).json(newRecord);
    } catch (error) {
      // Handle errors
      res
        .status(500)
        .json({ error: "An error occurred while creating the record" });
    }
  }
};

export const getLabelData = async (req, res) => {
  if (req.method === "GET") {
    try {
      // Fetch all records from the database
      const records = await prisma.label.findMany();

      // Respond with the fetched records
      res.status(200).json(records);
    } catch (error) {
      // Handle errors
      res
        .status(500)
        .json({ error: "An error occurred while fetching records" });
    }
  }
};
export const deleteLabel = async (req, res) => {
  if (req.method === "DELETE") {
    const { TrackingId } = req.params;

    // Log the TrackingId to ensure it is being passed correctly
    console.log("TrackingId:", TrackingId);

    try {
      // Attempt to delete the label based on the TrackingId
      const deletedLabel = await prisma.label.delete({
        where: { TrackingId: TrackingId },
      });

      // If successful, send the deleted label as a response
      res
        .status(200)
        .json({ message: "Label deleted successfully", deletedLabel });
    } catch (error) {
      // Log the exact error for debugging
      console.error("Error while deleting the label:", error);

      // Send the error message as a response
      res
        .status(500)
        .json({ error: "An error occurred while deleting the label" });
    }
  } else {
    // Handle non-DELETE requests
    res.status(405).json({ error: "Method not allowed" });
  }
};
