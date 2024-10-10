import prisma from "../db/db.config.js";
export const history = async (req, res) => {
  const { FromName, ToName, Weight, Tracking } = req.body;

  try {
    const historyEntry = await prisma.history.create({
      data: { FromName, ToName, Weight, Tracking },
    });
    res.status(201).json(historyEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create history entry" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const gettingHistory = await prisma.history.findMany();
    return res.status(200).json(gettingHistory);
  } catch (error) {
    // console.log(error);
    return res
      .status(400)
      .json({ msg: "error while fetching history records" });
  }
};
