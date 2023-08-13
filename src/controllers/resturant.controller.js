import responseHandler from "../handlers/response.handler.js";
import createRedisConn from "../services/redisClient.js";

const getRestaurantsFromYelp = async (req, res) => {
  try {
    let redisClient = await createRedisConn()
    const key = `${REDIS_KEY}`;
      const listValue = await redisClient.get(key)
      if (listValue != null) {
        const response = await JSON.parse(listValue);
        return responseHandler.ok(res, response);
      } else {
        const apiOptions = {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        };
        try {
          const res = await axios(yelpUrl, apiOptions);
          const { data } = res;
          const dataString = JSON.stringify(data);
          await redisClient.set(key, JSON.stringify(dataString));
          if (redisClient && redisClient.status === "ready") {
            redisClient.quit();
          }
          return responseHandler.ok(res, data);
        }
          catch (error) {
            console.error('Error fetching data:', error);
          }
      }
  } catch {
    responseHandler.error(res);
  }
};



export default { getRestaurantsFromYelp };