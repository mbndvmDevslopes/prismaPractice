import { maxBy, minBy } from 'remeda';
import { prisma } from './prisma';

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const usersAndRatings = await prisma.user.findMany({
    include: {
      starRatings: true,
    },
  });

  if (usersAndRatings) {
    const totalScore = usersAndRatings.map(
      (userAndRatings) => userAndRatings.starRatings
    );

    console.log(usersAndRatings.map((user) => user.starRatings));
    console.log('total score', totalScore);

    const averageScores = totalScore.map((userScores) => {
      const totalScore = userScores.reduce((accumulator, currentScore) => {
        return accumulator + currentScore.score;
      }, 0);

      const averageScore = totalScore / userScores.length;
      const userId = userScores[0].userId;

      return { userId, averageScore };
    });

    const grumpiestCritic = minBy(averageScores, (user) => user.averageScore);
    return grumpiestCritic?.userId;
  }
};

export const findTheNicestCriticId = async () => {
  const usersAndRatings = await prisma.user.findMany({
    include: {
      starRatings: true,
    },
  });

  if (usersAndRatings) {
    const totalScore = usersAndRatings.map(
      (userAndRatings) => userAndRatings.starRatings
    );

    const averageScores = totalScore.map((userScores) => {
      const totalScore = userScores.reduce((accumulator, currentScore) => {
        return accumulator + currentScore.score;
      }, 0);

      const averageScore = totalScore / userScores.length;
      const userId = userScores[0].userId;

      return { userId, averageScore };
    });

    const nicestCritic = maxBy(averageScores, (user) => user.averageScore);
    return nicestCritic?.userId;
  }
};
