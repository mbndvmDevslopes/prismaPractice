import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const scoreAverages = await prisma.starRating.groupBy({
    by: ["movieId"],
    _avg: {
      score: true,
    },
    orderBy: {
      movieId: "asc",
    },
  });
  console.log(scoreAverages);

  const movies = await prisma.movie.findMany({
    select: {
        title:true
    },
    orderBy: {
        id: "desc"
    }
  })
/*   const mappedStars = movies.map((movie, id) => {
  return {
    ...movie,
    stars: scoreAverages[id]._avg.score
}   

  })*/
  const result = scoreAverages.filter((avg) => {
    return avg._avg.score > n
  }).map((movie) => movie)
  console.log(result)
};

/* export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
    const MoviesWithScores = await prisma.movie.findMany({
        include:{
            starRatings: {
                select : {
                    score: true,
                },
                
            }
        },
    })
    console.log(MoviesWithScores[0]
        )
    return MoviesWithScores
};
 */
