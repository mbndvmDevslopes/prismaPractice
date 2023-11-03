import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const score = await prisma.starRating.groupBy({
   by :['movieId'],
   orderBy: {

     _avg: {
      score:'desc'
     }
   },
   take:n,
   skip:1,
   
    
  
    
  });

  console.log('movies',score);
};
/* const moviesWithAverageScore = await prisma.movie.findMany({
    include: {
      starRatings: {
        select: {
          score: true,
        },
      },
    },
  });

  const filteredMovies = moviesWithAverageScore
    .filter((movie) => {
      const totalScores = movie.starRatings.reduce(
        (sum, rating) => sum + rating.score,
        0
      );
      const averageScore = totalScores / movie.starRatings.length;
      return averageScore > n;
    })
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      parentalRating: movie.parentalRating,
      releaseYear: movie.releaseYear,
    }));

  return filteredMovies; */
