import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

export const findTheGrumpiestCriticId = async () => {
  const minAvgScoreAndUser = await prisma.starRating.groupBy({
    by: ["userId"],

    orderBy: {
      _avg: {
        score: "asc",
      },
    },
    take: 1,
  });
  return minAvgScoreAndUser[0].userId;
};

export const findTheNicestCriticId = async () => {
  const maxAvgScoreAndUser = await prisma.starRating.groupBy({
    by: ["userId"],
    orderBy: {
      _avg: {
        score: "desc",
      },
    },
    take: 1,
  });
  return maxAvgScoreAndUser[0].userId;
};
