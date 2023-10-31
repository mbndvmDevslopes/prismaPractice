import { StarRating, User } from '@prisma/client';
import { prisma } from './prisma';

// get average score for a user
interface UserWithRatings extends User {
  starRatings: StarRating[] | null;
}

export const getAverageScoreForUser = async (userId: number) => {
  const userAndRatings: UserWithRatings | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      starRatings: true,
    },
  });

  if (userAndRatings) {
    const totalScore = userAndRatings.starRatings?.reduce(
      (sum, rating) => sum + rating.score,
      0
    );
    if (totalScore && userAndRatings.starRatings) {
      const avgScore = totalScore / userAndRatings.starRatings.length;

      return avgScore;
    }
  }

  return 0;
};
