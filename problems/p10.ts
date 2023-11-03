import { prisma } from './prisma';

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const usersUnderNAge = await prisma.user.findMany({
    where: {
      age: {
        lt: n,
      },
    },
  });

  await prisma.starRating.deleteMany({
    where: {
      userId: {
        in: usersUnderNAge.map((user) => user.id),
      },
    },
  });

  await prisma.user.deleteMany({
    where: {
      id: {
        in: usersUnderNAge.map((user) => user.id),
      },
    },
  });
};
