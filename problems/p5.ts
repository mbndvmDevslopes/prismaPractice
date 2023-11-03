import { groupBy, map, reduce, sumBy } from 'remeda';
import { prisma } from './prisma';

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const starRatingGroups = await prisma.starRating.groupBy({
    by: ['movieId'],

    _avg: {
      score: true,
    },

    having: {
      score: {
        _avg: {
          gte: n,
        },
      },
    },
  });

  return prisma.movie.findMany({
    where: {
      id: {
        in: starRatingGroups.map((group) => group.movieId),
      },
    },
  });
};
