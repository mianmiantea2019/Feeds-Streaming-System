import express from "express";
import rankingController from "../controllers/ranking.controller.js";


const router = express.Router({ mergeParams: true });
router.get("/", async (req, res) => {
    try {
        const count = 10; // Number of top movies to fetch
        const topMovies = await getTopMovies(count, res);
        res.json(topMovies);
    } catch (error) {
        console.error('Error fetching top movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;