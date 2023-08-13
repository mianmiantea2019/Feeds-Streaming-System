import responseHandler from "../handlers/response.handler.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
import redis from "redis";
import createRedisConn from "../services/redisClient.js";

const getNewsDetail = async (req, res) => {
  try {
    let redisClient = await createRedisConn()
    const key = 'new_data:movie';
      const listValue = await redisClient.get(key)
      if (listValue != null) {
        const response = await JSON.parse(listValue);
          redisClient.quit();
        return responseHandler.ok(res, response);
      }
  } catch {
    responseHandler.error(res);
  }
};


const getTechNewsDetail = async (req, res) => {
  try {
    let redisClient = await createRedisConn()
      const key = 'new_data:technology';
      const listValue = await redisClient.get(key)
      if (listValue != null) {
        const response = await JSON.parse(listValue);
          redisClient.quit();
        return responseHandler.ok(res, response);
      }
  } catch {
    responseHandler.error(res);
  }
};

const getCYNewsDetail = async (req, res) => {
  try {
    let redisClient = await createRedisConn()
      const key = 'new_data:automation';
      const listValue = await redisClient.get(key)
      if (listValue != null) {
        const response = await JSON.parse(listValue);
          redisClient.quit();
        return responseHandler.ok(res, response);
      }
  } catch {
    responseHandler.error(res);
  }
};

const getPopularSearch = async (req, res) => {
  try {
    let redisClient = await createRedisConn()
      const key = 'search_results';
      const listValue = await redisClient.get(key)
      if (listValue != null) {
        const response = await JSON.parse(listValue);
          redisClient.quit();
        return responseHandler.ok(res, response);
      }
  } catch {
    responseHandler.error(res);
  }
};

export default { getNewsDetail,getPopularSearch,getTechNewsDetail,getCYNewsDetail };