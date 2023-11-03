import { prisma } from './prisma';

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = () => {
  return prisma.movie.findMany({
    where: {
      parentalRating: 'PG-13',
    },
    select: {
      releaseYear: true,
      parentalRating: true,
    },
    orderBy: {
      releaseYear: 'desc',
    },
  });
};
