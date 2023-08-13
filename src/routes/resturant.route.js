import express from "express";
import resturantController from "../controllers/resturant.controller.js";


const router = express.Router({ mergeParams: true });
router.get("/", resturantController.getRestaurantsFromYelp);


export default router;