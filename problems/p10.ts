import { prisma } from './prisma';

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  /*  try {
    await prisma.$transaction(async (tx) => {
      // Find users under the given age
      const usersToDelete = await tx.user.findMany({
        where: {
          age: {
            lt: n,
          },
        },
      });

      // Delete star ratings associated with the found users
      for (const user of usersToDelete) {
        await tx.starRating.deleteMany({
          where: {
            userId: user.id,
          },
        });
      }

      // Delete the users
      await tx.user.deleteMany({
        where: {
          age: {
            lt: n,
          },
        },
      });
    });
  } catch (error) {
    throw new Error(`Error deleting users: ${error.message}`);
  } */

  try {
    await prisma.$transaction(async (tx) => {
      // Find users under the given age
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

      // Delete star ratings associated with the found users in parallel
      await Promise.all(
        usersToDelete.map(async (user) => {
          await tx.starRating.deleteMany({
            where: {
              userId: user.id,
            },
          });
        })
      );

      // Delete the users
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
