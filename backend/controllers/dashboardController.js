import prisma from "../prisma/client.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        username: true,
        level: true,
        xp: true,
        totalXp: true,
        streak: true,
      },
    });

    const totalQuests = await prisma.quest.count({
      where: {
        userId: req.user.id,
      },
    });

    const completedQuests = await prisma.quest.count({
      where: {
        userId: req.user.id,
        completed: true,
      },
    });

    const pendingQuests = totalQuests - completedQuests;

    const completionRate =
      totalQuests === 0
        ? 0
        : Number(((completedQuests / totalQuests) * 100).toFixed(2));

    res.json({
      user,
      stats: {
        totalQuests,
        completedQuests,
        pendingQuests,
        completionRate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};