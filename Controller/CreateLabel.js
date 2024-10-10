import prisma from "../db/db.config.js"; // Only one import at the top

export const createLabel = async (req, res) => {
  const { FromName, ToName, Weight } = req.body;

  try {
    const labelCreate = await prisma.createLabel.create({
      data: { FromName, ToName, Weight },
    });
    res.status(201).json(labelCreate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create label entry" });
  }
};

export const getCreateLabel = async (req, res) => {
  try {
    const getLabels = await prisma.createLabel.findMany();
    res.status(200).json(getLabels);
    console.log(getLabels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve labels" });
  }
};

// Function to delete all labels
export const deleteAllLabels = async (req, res) => {
  try {
    // Delete all labels
    const deleteResult = await prisma.createLabel.deleteMany();
    res.status(200).json({
      message: "All labels deleted successfully",
      count: deleteResult.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete labels" });
  }
};
