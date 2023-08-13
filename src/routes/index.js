import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import reviewRoute from "./review.route.js";
import newsRoute from "./news.route.js";
import techRoute from "./tech.route.js";
import ResturantRoute from "./resturant.route.js";
import RankingRoute from "./ranking.route.js";


const router = express.Router();

router.use("/user", userRoute);
router.use("/reviews", reviewRoute);
router.use("/:mediaType", mediaRoute);
router.use("/news", newsRoute);
router.use("/technology", techRoute);
router.use("/hotmovie", RankingRoute);
router.use("/resturants", ResturantRoute);

export default router;
