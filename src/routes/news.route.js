import express from "express";
import newsController from "../controllers/news.controller.js";


const router = express.Router({ mergeParams: true });
router.get("/", newsController.getNewsDetail);
router.get("/popularsearch", newsController.getPopularSearch);


export default router;