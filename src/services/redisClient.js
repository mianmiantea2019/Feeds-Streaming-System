import redis from "redis";
import "dotenv/config";

async function createRedisConn () {
  const REDIS_USER = `${process.env.REDIS_USER}`;
  const REDIS_PASSWORD = `${process.env.REDIS_PASSWORD}`;
  const REDIS_HOST = `${process.env.REDIS_HOST}`;
  const REDIS_PORT = `${process.env.REDIS_PORT}`;
  const REDIS_MAXCLIENT = `${process.env.REDIS_MAXCLIENT}`;

  const redisClient = redis.createClient({
    username: REDIS_USER,
    password: REDIS_PASSWORD,
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      maxclients: REDIS_MAXCLIENT
    }
  });
    
      redisClient.on("error", (error) => console.error(`Error : ${error}`));
      await redisClient.connect();
      return redisClient;
}
export default createRedisConn;