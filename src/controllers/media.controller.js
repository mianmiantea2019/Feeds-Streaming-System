import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/movieApi.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
import createRedisConn from "../services/redisClient.js";


let redisClient;
const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    const key = mediaType + mediaCategory
    redisClient = await createRedisConn();

    const listValue = await redisClient.get(key)
    if (listValue != null) {
      const response = await JSON.parse(listValue);
      if (redisClient && redisClient.status === 'ready') {
        redisClient.quit();
      }
      return responseHandler.ok(res, response);
    }
    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    redisClient.set(key, JSON.stringify(response), (err, reply) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log('Set reply:', reply);
      }
    });
    return responseHandler.ok(res, response);
  } catch (error) {
    console.error('Error:', error);
    responseHandler.error(res);
  } finally {
    if (redisClient && redisClient.status === 'ready') {
      redisClient.quit();
    }
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const key = "genres";
    const listValue = await redisClient.get(key)
    if (listValue != null) {
      const response = await JSON.parse(listValue);
      if (redisClient && redisClient.status === 'ready') {
        redisClient.quit();
      }
      return responseHandler.ok(res, response);
    }

    const response = await tmdbApi.mediaGenres({ mediaType });

    const data = JSON.stringify(response);
    redisClient.set(key, data, (err, reply) => {
      if (err) {
        console.error("Error storing genres data in Redis:", err);
      } else {
        console.log("Genres data stored in Redis:", reply);
      }
    });
    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  } finally {
    if (redisClient && redisClient.status === 'ready') {
      redisClient.quit();
    }
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const key = mediaType+query
      redisClient = await createRedisConn();
      
      const timestamp = Date.now();
      const resultFromRecord = await redisClient.hGet('search_results', key, (err, previousData) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(previousData);
        }
      });
      if(resultFromRecord!= null) {
        const response = await JSON.parse(resultFromRecord);
        const updatedSearchResult = {
          ...response,
          searchCount: response.searchCount + 1, 
          lastSearchTime: timestamp 
        };
        const updatedData = JSON.stringify(updatedSearchResult);
      }
      const response = await tmdbApi.mediaSearch({
        query,
        page,
        mediaType: mediaType === "people" ? "person" : mediaType
      });

      if(response.results.length === 0) return;
      let searchResult = {
        results: response.results, // Use response.results instead of response
        searchCount: 1,
        lastSearchTime: timestamp
      };
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };
    const media = await tmdbApi.mediaDetail(params);
    media.credits = await tmdbApi.mediaCredits(params);
    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;
    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;
    media.images = await tmdbApi.mediaImages(params);
    const tokenDecoded = tokenMiddlerware.tokenDecode(req);
    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
        media.isFavorite = isFavorite !== null;
      }
    }
    media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");
    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };