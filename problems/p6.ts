import { prisma } from './prisma';

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const moviesWithRatingFromUser: {
    starRatings: {
      movie: {
        id: number;
        title: string;
        releaseYear: number;
        parentalRating: string;
      };
    }[];
  } | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      starRatings: {
        select: {
          movie: {
            select: {
              id: true,
              title: true,
              releaseYear: true,
              parentalRating: true,
            },
          },
        },
      },
    },
  });

  if (moviesWithRatingFromUser) {
    const moviesWatched = moviesWithRatingFromUser.starRatings.map(
      (rating) => rating.movie
    );
    return moviesWatched;
  }

  return [];
};
