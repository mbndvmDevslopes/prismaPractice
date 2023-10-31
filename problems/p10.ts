import { prisma } from './prisma';

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  try {
    await prisma.$transaction(async (tx) => {
      const usersToDelete = await tx.user.findMany({
        where: {
          age: {
            lt: n,
          },
        },
        select: {
          id: true,
        },
      });

      await Promise.all(
        usersToDelete.map(async (user) => {
          await tx.starRating.deleteMany({
            where: {
              userId: user.id,
            },
          });
        })
      );

      await tx.user.deleteMany({
        where: {
          age: {
            lt: n,
          },
        },
      });
    });
  } catch (error) {
    throw new Error(`Error deleting users`);
  }
};
