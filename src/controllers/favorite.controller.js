import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";
import createRedisConn from "../services/redisClient.js";

const addFavorite = async (req, res) => {
  let mediaId = req.body.mediaId
  let mediaTitle = req.body.mediaTitle

  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id
    });

    await favorite.save();
    let redisClient = await createRedisConn()
    try {
      await redisClient.ZINCRBY('popular_movies', 1, mediaId.toString());
      await redisClient.hSet('movies_info', mediaId.toString(), mediaTitle);
      redisClient.quit();
    } catch (error) {
      console.error('Error fetching data:', error);
      redisClient.quit();
    }
    responseHandler.created(res, favorite);

  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  let redisClient = await createRedisConn()
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId
    });
    let mediaId = favorite.mediaId;
    if (!favorite) return responseHandler.notfound(res);

    await favorite.remove();

    try {
      redisClient.ZINCRBY('popular_movies', -1, mediaId.toString());
      await redisClient.hDel('movies_info', mediaId.toString());
      redisClient.quit();
    }
    catch (error) {
      console.error('Error updating popular_movies:', error);
      redisClient.quit();
    }
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");
    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};
  
export default { addFavorite, removeFavorite, getFavoritesOfUser };