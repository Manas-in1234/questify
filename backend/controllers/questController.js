import prisma from "../prisma/client.js";

// ======================
// Create Quest
// ======================
export const createQuest = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      xp,
      dueDate,
    } = req.body;

    if (!title || !category || !difficulty || xp == null) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const quest = await prisma.quest.create({
      data: {
        title,
        description,
        category,
        difficulty,
        xp,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Quest created successfully",
      quest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create quest",
    });
  }
};

// ======================
// Get All Quests
// ======================
export const getQuests = async (req, res) => {
  try {
    const quests = await prisma.quest.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(quests);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch quests",
    });
  }
};

// ======================
// Get Single Quest
// ======================
export const getQuest = async (req, res) => {
  try {
    const { id } = req.params;

    const quest = await prisma.quest.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found",
      });
    }

    res.json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch quest",
    });
  }
};

// ======================
// Update Quest
// ======================
export const updateQuest = async (req, res) => {
  try {
    const { id } = req.params;

    const quest = await prisma.quest.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found",
      });
    }

    const updatedQuest = await prisma.quest.update({
      where: { id },
      data: req.body,
    });

    res.json({
      message: "Quest updated successfully",
      quest: updatedQuest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update quest",
    });
  }
};

// ======================
// Delete Quest
// ======================
export const deleteQuest = async (req, res) => {
  try {
    const { id } = req.params;

    const quest = await prisma.quest.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found",
      });
    }

    await prisma.quest.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Quest deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete quest",
    });
  }
};

// ======================
// Complete Quest
// ======================
export const completeQuest = async (req, res) => {
  try {
    const { id } = req.params;

    const quest = await prisma.quest.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found",
      });
    }

    if (quest.rewardClaimed) {
      return res.status(400).json({
        message: "XP already claimed",
      });
    }

    const updatedQuest = await prisma.quest.update({
      where: { id },
      data: {
        completed: true,
        rewardClaimed: true,
      },
    });

const user = await prisma.user.findUnique({
  where: {
    id: req.user.id,
  },
});

const newXp = user.xp + quest.xp;
const newTotalXp = user.totalXp + quest.xp;

// Every 100 XP = 1 Level
const newLevel = Math.floor(newTotalXp / 100) + 1;

const updatedUser = await prisma.user.update({
  where: {
    id: req.user.id,
  },
  data: {
    xp: newXp,
    totalXp: newTotalXp,
    level: newLevel,
  },
});

    res.json({
      message: "Quest completed successfully",
      quest: updatedQuest,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to complete quest",
    });
  }
};