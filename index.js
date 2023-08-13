import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import cron from "node-cron";
import updateRedis from "./src/job/update.js";
import { loggerMiddleware } from './src/config/customFormatv.js'; 
import path from 'path';
import { fileURLToPath } from 'url';
import createRedisConn from "./src/services/redisClient.js";
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import scheduleCronJobs from "./src/job/runCronJob.js";



const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const clientfilename = fileURLToPath(import.meta.url);
const dirclient = path.dirname(clientfilename);
const clientfolder = path.join(dirclient, "./client/build"); 
app.use(express.static(clientfolder))

app.use(loggerMiddleware);

app.set('trust proxy', 1);
const corsOptions = {
 origin: [
    '',
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 10,
  delayMs: 2000, 
});

const speedLimiter = slowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500
});
app.use("/api/v1", limiter, speedLimiter,routes);


const server = createServer(app);
const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: '', 
    methods: ['GET', 'POST']
  }
});

function handleDataUpdate(updatedData) {
  io.emit(EVENT_NAME, JSON.stringify(updatedData));
}

setInterval(async () => {
  const redisClient = await createRedisConn();
  const key = REDIS_KEY;
  let results = await redisClient.ZRANGE(REDIS_KEY,0,-1, 'WITHSCORES')
    const moviesWithScores = [];
    for (const movieId of results) {
      const score = await redisClient.zScore(key, movieId);
      const mediaName = await redisClient.hGet(REDIS_KEY, movieId);

      if (score !== 0) {
        moviesWithScores.push({ movieId,mediaName,score });
      }
    }
    await redisClient.quit();
  handleDataUpdate(moviesWithScores);
  console.log('Scheduled data update:', new Date().toLocaleString());
}, 2000); 


mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});


scheduleCronJobs()


app.get("/*", function(req, res) {
  const clientfilename = fileURLToPath(import.meta.url);
const dirclient = path.dirname(clientfilename);
  const filePath = path.resolve(dirclient, "./client/build/index.html");
  res.sendFile(filePath, function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});