import responseHandler from "../handlers/response.handler.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
import redis from "redis";
import createRedisConn from "../services/redisClient.js";

const getTopMovies = async (req, res) => {
  try {
    const redisClient = await createRedisConn();
    const key = `popular_movies`;
    const start = 0; // Start index of the range
    const stop = 9; // End index of the range (get top 10 movies)

    redisClient.zRevRank(key, start, stop, 'WITHSCORES', async (err, results) => {
      if (err) {
        console.error('Error fetching top movies:', err);
        responseHandler.error(res);
      } else {
        const topMovies = [];
        for (let i = 0; i < results.length; i += 2) {
          const movieId = results[i];
          const score = parseInt(results[i + 1]);
          topMovies.push({ movieId, score });
        }
        console.log(topMovies);
        responseHandler.ok(res, topMovies);
      }

      // Always remember to quit the Redis connection
      redisClient.quit();
    });
  } catch {
    responseHandler.error(res);
  }
};


export default { getTopMovies };