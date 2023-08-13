import responseHandler from "../handlers/response.handler.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
import redis from "redis";
import createRedisConn from "../services/redisClient.js";

const getTopMovies = async (req, res) => {
  try {
    const redisClient = await createRedisConn();
    const key = `popular_movies`;

    let results = await redisClient.ZRANGE(`popular_movies`, 0, -1, 'WITHSCORES')
    const reversedArray = results.reverse();
    const moviesWithScores = [];
    for (const movieId of results) {
      const score = await redisClient.zScore(key, movieId);
      const mediaName = await redisClient.hGet('movies_info', movieId);

      if (score !== 0) {
        moviesWithScores.push({ movieId, mediaName, score });
      }
    }
    redisClient.quit();
    responseHandler.ok(res, moviesWithScores);
  } catch {
    responseHandler.error(res);
  }
};


export default { getTopMovies };