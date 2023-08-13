import express from "express";
import rankingController from "../controllers/ranking.controller.js";


const router = express.Router({ mergeParams: true });
router.get("/", rankingController.getTopMovies);


export default router;